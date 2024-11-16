import AWS from 'aws-sdk';
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
import crypto from 'crypto';
import { ethers } from 'ethers';


import { createResponse, parseTelegramUserData, verifyTelegramUser } from './utils.mjs';
import { getTotalReferrals } from './refer.mjs';
import { readENS } from './ens.mjs';
import { normalize, labelhash, namehash } from 'viem/ens';


export const login = async (telegramInitData) => {
    // Verify user.
    try {
        const verifiedUser = verifyTelegramUser(telegramInitData);

        if (!verifiedUser) {
            throw new Error('Failed to verify Telegram user');
        }
    } catch (error) {
        return createResponse(403, 'Forbidden', 'login', `Failed to verify Telegram user ${error.message}`);
    }


    // Parse Telegram user data.
    let telegramUser;
    let telegramUserId;
    try {
        const telegramUserData = parseTelegramUserData(telegramInitData);
        telegramUser = telegramUserData.telegramUser;
        telegramUserId = telegramUserData.telegramUserId;

        if (!telegramUser.id) {
            throw new Error('Invalid user data');
        }

        if (telegramUserData.is_bot) {
            return createResponse(403, 'Forbidden', 'login', 'Bots cannot play');
        }
    } catch (error) {
        return createResponse(400, 'Bad Request', 'login', `Failed to parse Telegram user data ${error.message}`);
    }


    // Return user if it already exists.
    let userData;
    try {
        const user = await readUser(telegramUserId);

        if (user.statusCode == 200) {
            userData = JSON.parse(user.body).data;

            // Update username if it has changed.
            if (userData.username !== telegramUser.username) {
                try {
                    const params = {
                        TableName: process.env.USERS_TABLE_NAME,
                        Key: {
                            PK: userData.PK
                        },
                        UpdateExpression: 'set username = :username',
                        ExpressionAttributeValues: {
                            ':username': telegramUser.username
                        }
                    };
                    await dynamoDb.update(params).promise();
                } catch (error) {
                    return createResponse(500, 'Internal Server Error', 'login', `Failed to update username: ${error.message}`);
                }
            }

            return createResponse(200, 'OK', 'login', 'User existed', userData);
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'login', `Failed to check existing user: ${error.message}`);
    }


    // Check if the new user already has an EOA in the pending refers table.
    let address;
    try {
        const params = {
            TableName: process.env.PENDING_REFERS_TABLE_NAME,
            Key: {
                PK: telegramUser.username
            }
        };
        const result = await dynamoDb.get(params).promise();

        if (result?.Item) {
            address = result.Item.walletAddress;
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'login', `Failed to check pending user: ${error.message}`);
    }


    // Create a new Ethereum EOA for the user.
    if (!address) {
        let wallet, privateKey;
        try {
            wallet = ethers.Wallet.createRandom();
            privateKey = wallet.privateKey;
            address = wallet.address;
        } catch (error) {
            return createResponse(500, 'Internal Server Error', 'login', 'Failed to create Ethereum wallet');
        }


        // Encrypt private key.
        let encryptedPrivateKey;
        try {
            const cipher = crypto.createCipher('aes-256-cbc', process.env.PRIVATE_KEY_ENCRYPTION_KEY);
            encryptedPrivateKey = cipher.update(privateKey, 'utf8', 'hex') + cipher.final('hex');

            const params = {
                TableName: process.env.ENCRYPTED_PRIVATE_KEY_TABLE_NAME,
                Item: {
                    PK: address,
                    SK: encryptedPrivateKey
                }
            };
            await dynamoDb.put(params).promise();
        } catch (error) {
            return createResponse(500, 'Internal Server Error', 'login', error.message);
        }
    }


    // Create ENS
    try {
        // Initialize provider
        const provider = new ethers.JsonRpcProvider(`https://base-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);

        // Use administrative wallet that owns the parent domain
        const adminWallet = new ethers.Wallet(process.env.ADMIN_WALLET_PK, provider);

        // ENS registry contract address and ABI
        const ensRegistarAddress = '0x6A5A4BBBC7E256851D033c4005823548A08233Fd';
        const ensRegistarABI = [
            { "type": "constructor", "inputs": [{ "name": "_registry", "type": "address", "internalType": "contract IL2Registry" }, { "name": "_contractOwner", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "available", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "register", "inputs": [{ "name": "label", "type": "string", "internalType": "string" }, { "name": "owner", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "targetRegistry", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IL2Registry" }], "stateMutability": "view" }, { "type": "function", "name": "transferOwnership", "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "NameRegistered", "inputs": [{ "name": "label", "type": "string", "indexed": true, "internalType": "string" }, { "name": "owner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "error", "name": "OwnableInvalidOwner", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }] }, { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [{ "name": "account", "type": "address", "internalType": "address" }] }
        ];
        const ensRegistar = new ethers.Contract(ensRegistarAddress, ensRegistarABI, adminWallet);

        // Define the parent domain and subdomain
        let label;
        if (telegramUser.username) {
            label = normalize(telegramUser.username);
        } else {
            label = normalize(telegramUserId.toString());
        }

        const tx = await ensRegistar.register(label, address, {
            gasLimit: 500000,
        });


        console.log(`Transaction sent: ${tx.hash}`);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log(`Transaction mined in block ${receipt.blockNumber}`);

    } catch (error) {
        console.error('ENS creation error:', error);
        return createResponse(500, 'Internal Server Error', 'login', `Failed to create ENS: ${error.message}`);
    }


    // Record user in DynamoDB.
    let userRecord;
    try {
        userRecord = {
            PK: `TELEGRAM_ID#${telegramUserId}`,

            telegramId: telegramUserId,
            walletAddress: address
        };
        if (telegramUser.first_name) userRecord.firstName = telegramUser.first_name;
        if (telegramUser.last_name) userRecord.lastName = telegramUser.last_name;
        if (telegramUser.username) { // Not all users have a Telegram username.
            userRecord.username = telegramUser.username;
        }

        const params = {
            TableName: process.env.USERS_TABLE_NAME,
            Item: userRecord,
        };
        await dynamoDb.put(params).promise();
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'login', error.message);
    }


    // Return success.
    return createResponse(200, 'OK', 'login', 'User created', userRecord);
};


export const readUser = async (telegramUserId) => {
    // Read user from db.
    let userRecord = {};
    try {
        const params = {
            TableName: process.env.USERS_TABLE_NAME,
            Key: {
                PK: `TELEGRAM_ID#${telegramUserId}`
            }
        };
        const result = await dynamoDb.get(params).promise();

        if (result?.Item) {
            userRecord = result.Item;
        } else {
            return createResponse(404, 'Not Found', 'readUser', 'User not found');
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'readUser', `Failed to read user data: ${error.message}`);
    }

    // Read user from referrals contract.
    try {
        const totalReferrals = await getTotalReferrals(userRecord.walletAddress);
        userRecord.totalReferrals = totalReferrals;
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'readUser', `Failed to read user referrals: ${error.message}`);
    }
    
    // Read user's ENS.
    // TODO
    try {
        // readENS
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'readUser', `Failed to read user ENS: ${error.message}`);
    }


    // Return success.
    return createResponse(200, 'OK', 'readUser', 'User found', userRecord);
};
