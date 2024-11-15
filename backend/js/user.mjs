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


    // Return success.
    return createResponse(200, 'OK', 'login', 'User created', telegramUserId);
};
