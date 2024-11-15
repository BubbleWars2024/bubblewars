import crypto from 'crypto';
import { ethers } from 'ethers';
import AWS from 'aws-sdk';
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { createResponse, parseTelegramUserData, verifyTelegramUser } from './utils.mjs';


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


    // Record user in DynamoDB.
    let userRecord;
    try {
        userRecord = {
            PK: `TELEGRAM_ID#${telegramUserId}`,

            telegramId: telegramUserId,
            walletAddress: address
        };
        if (telegramUser.first_name) userRecord.firstName = telegramUser.first_name;
        if (telegramUser.last_name)  userRecord.lastName = telegramUser.last_name;
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
