import AWS from 'aws-sdk';
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
import crypto from 'crypto';
import { ethers } from 'ethers';
import { readUser } from './user.mjs';


import { bubbleWarsAbi } from './abi.mjs';
import { createResponse, parseTelegramUserData, verifyTelegramUser } from './utils.mjs';


const bubbleWarsAddress = '0x6990b67c9cb437CaCb2a0349463bad27FA00736f';
const baseSepoliaRPC = 'https://sepolia.base.org';


export const attack = async (data) => {
    // Parse request data.
    let telegramInitData;
    let raidTarget;
    try {
        telegramInitData = data.telegramInitData;
        raidTarget = data.attackTarget;
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
            let decryptedPrivateKey = decipher.update(result.Item.key, 'hex', 'utf8');
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


    // Init dev wallet.
    let devWallet;
    try {
        const provider = new ethers.JsonRpcProvider(baseSepoliaRPC);
        const k = process.env.ADMIN_WALLET_PK;
        devWallet = new ethers.Wallet(k, provider);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init dev wallet: ${error.message}`);
    }

    // Fund users wallet
    try {
        const tx = await devWallet.sendTransaction({
            to: userWallet.address,
            value: ethers.parseEther("0.0002")
        });
          
        await tx.wait();
    } catch(error) {
        // Dont throw
    }


    // Init Bubble Wars contract.
    let bubbleWarsContract;
    try {
        bubbleWarsContract = new ethers.Contract(bubbleWarsAddress, bubbleWarsAbi, userWallet);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init Bubble Wars contract: ${error.message}`);
    }


    // Raid
    let raidTxReceipt;
    try {
        let raidTx = await bubbleWarsContract.raid(
            raidTarget,
            ethers.utils.randomBytes(32),
            {
                gasLimit: 500000,
                value: ethers.parseEther("0.0001")
            }
        );
        console.log('raidTx', raidTx);
        raidTxReceipt = await raidTx.wait();
        console.log('raidTxReceipt:', raidTxReceipt);
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to raid: ${error.message}`);
    }
}
