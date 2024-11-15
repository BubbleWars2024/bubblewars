import crypto from 'crypto';
import { ethers } from 'ethers';
import AWS from 'aws-sdk';
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { createResponse, parseTelegramUserData, verifyTelegramUser } from './utils.mjs';
import { namehash } from 'eth-ens-namehash';


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


    // Create a new Ethereum EOA for the user
    let wallet, privateKey, address;
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


    // Create ENS
    try {
        const provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);
        const userWallet = new ethers.Wallet(privateKey, provider);

        // Define the parent domain and subdomain
        let subdomain;
        if (telegramUser.username) {
            subdomain = telegramUser.username;
        } else {
            subdomain = telegramUser.telegramUserId;
        }
        let parentDomain = "bubblewars.eth";
        let fullDomain = `${subdomain}.${parentDomain}`;

        // ENS registry address
        const ensRegistryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
        const ensRegistryABI = [
            'function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl) external',
            'function resolver(bytes32 node) external view returns (address)',
            'function setOwner(bytes32 node, address owner) external',
        ];
        const ensRegistry = new ethers.Contract(ensRegistryAddress, ensRegistryABI, userWallet);

        // Compute namehashes
        const parentNamehash = namehash.hash(parentDomain);
        const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(subdomain));

        // Get the resolver address of the parent domain
        const resolverAddress = await ensRegistry.resolver(parentNamehash);
        if (resolverAddress === ethers.constants.AddressZero) {
            throw new Error('Parent domain has no resolver set');
        }

        // Create the subdomain and set the owner and resolver
        const tx1 = await ensRegistry.setSubnodeRecord(
            parentNamehash,
            labelHash,
            address, // The new user's address
            resolverAddress,
            0 // TTL
        );
        await tx1.wait();

        // Initialize the resolver contract to set the address record
        const resolverABI = ['function setAddr(bytes32 node, address addr) external'];
        const resolver = new ethers.Contract(resolverAddress, resolverABI, userWallet);

        // Set the address record for the subdomain to point to the user's address
        const subdomainNamehash = namehash.hash(fullDomain);
        const tx2 = await resolver.setAddr(subdomainNamehash, address);
        await tx2.wait();

        // Confirm that the subdomain is owned by the new user
        const tx3 = await ensRegistry.setOwner(subdomainNamehash, address);
        await tx3.wait();

    } catch (error) {
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
            return createResponse(200, 'OK', 'readUser', 'User found', userRecord);
        } else {
            return createResponse(404, 'Not Found', 'readUser', 'User not found');
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'readUser', `Failed to read user data: ${error.message}`);
    }
};
