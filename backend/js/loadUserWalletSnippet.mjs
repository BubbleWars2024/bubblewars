

    // // Parse Telegram user data.
    // let telegramUser;
    // let telegramUserId;
    // try {
    //     const telegramUserData = parseTelegramUserData(telegramInitData);
    //     telegramUser = telegramUserData.telegramUser;
    //     telegramUserId = telegramUserData.telegramUserId;

    //     if (!telegramUser.id) {
    //         throw new Error('Invalid user data');
    //     }

    //     if (telegramUserData.is_bot) {
    //         return createResponse(403, 'Forbidden', 'login', 'Bots cannot play');
    //     }
    // } catch (error) {
    //     return createResponse(400, 'Bad Request', 'login', `Failed to parse Telegram user data ${error.message}`);
    // }


    // // Get user.
    // let userData;
    // try {
    //     const user = await readUser(telegramUserId);

    //     if (user.statusCode != 200) {
    //         return createResponse(404, 'Not Found', 'createReferral', 'User not found');
    //     }

    //     userData = JSON.parse(user.body).data;
    // } catch (error) {
    //     return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to get user: ${error.message}`);
    // }


    // // Get user private key.
    // let userPrivateKey;
    // try {
    //     const params = {
    //         TableName: process.env.ENCRYPTED_PRIVATE_KEY_TABLE_NAME,
    //         Key: {
    //             PK: userData.walletAddress
    //         }
    //     };
    //     const result = await dynamoDb.get(params).promise();

    //     if (result?.Item) {
    //         const decipher = crypto.createDecipher('aes-256-cbc', process.env.PRIVATE_KEY_ENCRYPTION_KEY);
    //         let decryptedPrivateKey = decipher.update(result.Item, 'hex', 'utf8');
    //         decryptedPrivateKey += decipher.final('utf8');
    //         userPrivateKey = decryptedPrivateKey;
    //     } else {
    //         return createResponse(404, 'Not Found', 'createReferral', 'Private key not found');
    //     }
    // } catch (error) {
    //     return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to get private key: ${error.message}`);
    // }


    // // Init user wallet.
    // let userWallet;
    // try {
    //     const provider = new ethers.JsonRpcProvider(baseSepoliaRPC);
    //     const k = process.env.PRIVATE_KEY;
    //     userWallet = new ethers.Wallet(k, provider);
    // } catch (error) {
    //     return createResponse(500, 'Internal Server Error', 'createReferral', `Failed to init user wallet: ${error.message}`);
    // }
