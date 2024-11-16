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


    // Validate referral is not an existing user.
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
            return createResponse(404, 'Not Found', 'createReferral', 'User already referred');
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to read user data: ${error.message}`);
    }


    // Create EOA for referree.
    let wallet, privateKey, referTargetAddress;
    try {
        wallet = ethers.Wallet.createRandom();
        privateKey = wallet.privateKey;
        referTargetAddress = wallet.address;
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
                PK: referTargetAddress,
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
            walletAddress: referTargetAddress
        };

        const params = {
            TableName: process.env.PENDING_REFERS_TABLE_NAME,
            Item: userRecord,
        };
        await dynamoDb.put(params).promise();
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'login', error.message);
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


    // Init referrals contract.
    let referContract;
    try {
        referContract = new ethers.Contract(referralsContractAddress, referABI, devWallet);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init contract: ${error.message}`);
    }


    // Create referral.
    let referTxReceipt;
    try {
        let referTx = await referContract.setReferral(
            0,
            referTargetAddress,
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
