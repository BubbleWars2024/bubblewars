export const createResponse = (statusCode, statusDescription, responder, message, data = {}) => {
    const response = {
        statusCode,
        statusDescription,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            responder,
            message,
            data
        })
    };

    statusCode === 200 ? console.log('RESPONSE:', response) : console.error('RESPONSE:', response);

    return response;
};


export const parseTelegramUserData = (telegramInitData) => {
    const urlParams = new URLSearchParams(telegramInitData);
    const userJson = urlParams.get('user');
    const telegramUser = JSON.parse(userJson);
    const telegramUserId = telegramUser.id.toString();
    const telegramUsername = telegramUser.username;
    return { telegramUser, telegramUserId, telegramUsername };
}


export const verifyTelegramUser = (telegramInitData) => {
    // Access the 'data' property of telegramInitData
    const queryString = telegramInitData;

    // Step 1: Decode the URL-encoded string and parse it into a URLSearchParams object
    const urlParams = new URLSearchParams(queryString);

    // Step 2: Extract and delete the hash parameter from urlParams
    const providedHash = urlParams.get('hash');
    urlParams.delete('hash');

    // Step 3: Sort the remaining URL parameters
    const sortedParams = [...urlParams.entries()].sort((a, b) => a[0].localeCompare(b[0]));

    // Step 4: Create the data-check string
    let dataCheckString = '';
    for (const [key, value] of sortedParams) {
        dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1); // Remove the last newline character

    // Step 5: Generate the secret key using the HMAC-SHA256 of the bot token with the string "WebAppData"
    const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.TELEGRAM_BOT_TOKEN);
    const secretKey = secret.digest();

    // Step 6: Calculate the HMAC-SHA256 hash of the data-check string using the secret key
    const calculatedHash = crypto.createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    // Step 7: Compare the calculated hash with the provided hash
    const isValid = calculatedHash === providedHash;

    // Optional: Check the auth_date to prevent replay attacks.
    const authDate = parseInt(urlParams.get('auth_date'), 10);
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - authDate > 86400) {
        return false;
    }

    return isValid;
};