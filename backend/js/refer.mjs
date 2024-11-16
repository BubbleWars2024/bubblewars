import AWS from 'aws-sdk';
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
import crypto from 'crypto';
import { ethers } from 'ethers';


import { referABI } from './abi.mjs';
import { createResponse, parseTelegramUserData, verifyTelegramUser } from './utils.mjs';


const referralsContractAddress = '0xD0B8D0425b737A920Db0B7581Cd2c45CB8caF0fa';
const baseSepoliaRPC = 'https://sepolia.base.org';


export const createReferral = async (data) => {
    // Parse request data.
    let telegramInitData;
    let referTarget;
    try {
        telegramInitData = data.telegramInitData;
        referTarget = data.referTarget;
    } catch (error) {
        return createResponse(400, 'Bad Request', 'createReferral', 'Failed to parse request data: ' + error.message);
    }


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


    // Get user.
    let userData;
    try {
        const user = await readUser(telegramUserId);

        if (user.statusCode != 200) {
            return createResponse(404, 'Not Found', 'createReferral', 'User not found');
        }

        userData = JSON.parse(user.body).data;
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to get user: ${error.message}`);
    }


    // Get user private key.
    let userPrivateKey;
    try {
        const params = {
            TableName: process.env.ENCRYPTED_PRIVATE_KEY_TABLE_NAME,
            Key: {
                PK: userData.walletAddress
            }
        };
        const result = await dynamoDb.get(params).promise();

        if (result?.Item) {
            const decipher = crypto.createDecipher('aes-256-cbc', process.env.PRIVATE_KEY_ENCRYPTION_KEY);
            let decryptedPrivateKey = decipher.update(result.Item, 'hex', 'utf8');
            decryptedPrivateKey += decipher.final('utf8');
            userPrivateKey = decryptedPrivateKey;
        } else {
            return createResponse(404, 'Not Found', 'createReferral', 'Private key not found');
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to get private key: ${error.message}`);
    }


    // Init user wallet.
    let userWallet;
    try {
        const provider = new ethers.JsonRpcProvider(baseSepoliaRPC);
        const k = userPrivateKey;
        userWallet = new ethers.Wallet(k, provider);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init user wallet: ${error.message}`);
    }

    // Validate referral is not an existing user.
    let referralAddress
    try {
        const params = {
            TableName: process.env.USERS_TABLE_NAME,
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': referTarget
            }
        };
        const result = await dynamoDb.query(params).promise();

        if (result?.Items?.length > 0) {
            referralAddress = result.Items[0].walletAddress;
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to read user data: ${error.message}`);
    }


    if(!referralAddress) {
        // Create EOA for referree.
        let wallet, privateKey, address;
        try {
            wallet = ethers.Wallet.createRandom();
            privateKey = wallet.privateKey;
            address = wallet.address;
        } catch (error) {
            return createResponse(500, 'Internal Server Error', 'createReferral', 'Failed to create Ethereum wallet');
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

        // Record referred user in DynamoDB.
        let userRecord;
        try {
            userRecord = {
                PK: referTarget,
                walletAddress: address
            };

            const params = {
                TableName: process.env.PENDING_REFERS_TABLE_NAME,
                Item: userRecord,
            };
            await dynamoDb.put(params).promise();
        } catch (error) {
            return createResponse(500, 'Internal Server Error', 'login', error.message);
        }

        referralAddress = address;
    }


    // Init dev wallet.
    let devWallet;
    try {
        const provider = new ethers.JsonRpcProvider(baseSepoliaRPC);
        const k = process.env.ADMIN_WALLET_PK;
        devWallet = new ethers.Wallet(k, provider);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init user wallet: ${error.message}`);
    }


    // Fund users wallet
    try {
        const tx = await devWallet.sendTransaction({
            to: userWallet.address,
            value: parseEther("0.0001")
        });
          
        await tx.wait();
    } catch(error) {
        // Dont throw
    }


    // Init referrals contract.
    let referContract;
    try {
        referContract = new ethers.Contract(referralsContractAddress, referABI, userWallet);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init contract: ${error.message}`);
    }


    // Create referral.
    let referTxReceipt;
    try {
        let referTx = await referContract.setReferral(
            2,
            referralAddress,
            {
                gasLimit: 500000
            }
        );
        console.log('referTx', referTx);
        referTxReceipt = await referTx.wait();
        console.log('referTxReceipt:', referTxReceipt);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to create referral: ${error.message}`);
    }


    // Return success.
    return createResponse(200, 'OK', 'createReferral', 'Referral created');
}


export const getTotalReferrals = async (data) => {
    // Parse request data.
    let referSource;
    try {
        referSource = data.referSource;
        console.log('referSource', referSource);
    } catch (error) {
        return createResponse(400, 'Bad Request', 'getTotalReferrals', 'Failed to parse request data: ' + error.message);
    }


    // Init dev wallet.
    let devWallet;
    try {
        const provider = new ethers.JsonRpcProvider(baseSepoliaRPC);
        const k = process.env.ADMIN_WALLET_PK;
        devWallet = new ethers.Wallet(k, provider);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'getTotalReferrals', `Failed to init user wallet: ${error.message}`);
    }


    // Init referrals contract.
    let referContract;
    try {
        referContract = new ethers.Contract(referralsContractAddress, referABI, devWallet);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'getTotalReferrals', `Failed to init contract: ${error.message}`);
    }


    // Create referral.
    let totalReferrals;
    try {
        let totalReferrals = await referContract.getTotalReferrals(
            0,
            referSource
        );
        console.log('totalReferrals', totalReferrals);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'getTotalReferrals', `Failed to get total referrals: ${error.message}`);
    }


    // Return success.
    return createResponse(200, 'OK', 'getTotalReferrals', 'Referral created', { totalReferrals });
}
