import { createReferral, getTotalReferrals } from './js/refer.mjs';
import { login, readUser } from './js/user.mjs';
import { createResponse } from './js/utils.mjs';


export const handler = async (event) => {


    // Log event.
    console.log(event);


    // Preflight request handling for CORS.
    if (event.requestContext.http.method === 'OPTIONS') {
        return createResponse(204, 'No Content', 'handler', 'No Content', );
    } else if (event.requestContext.http.method !== 'POST') {
        return createResponse(405, 'Method Not Allowed', 'handler', 'POST method is required');
    }


    // Validate origin.
    if (event.headers.origin !== 'https://bubblewars2024.s3.ap-southeast-1.amazonaws.com') {
        return createResponse(403, 'Forbidden', 'handler', 'Invalid or missing origin header');
    }


    // Validate x-api-key header.
    if (event.headers['x-api-key'] != process.env.X_API_KEY) {
        return createResponse(403, 'Forbidden', 'handler', 'Invalid or missing x-api-key header');
    }


    // Parse event.
    let path, data;
    try {
        path = event.requestContext.http.path;
        
        const body = JSON.parse(event.body)
        data = body.data;

        console.log('PATH', path, 'DATA', data);
    } catch (error) {
        return createResponse(400, 'Bad Request', 'handler', 'Invalid request');
    }


    // Execute specific user operation.
    try {
        switch (path) {
            // Play.
            case '/play/attack':
                return await attack(data);

            // Referrals.
            case '/refer/create':
                return await createReferral(data);
            case '/refer/total':
                return await getTotalReferrals(data);

            // User.
            case '/user/login':
                return await login(data);
            case '/user/read':
                return await readUser(data);

            // Default.
            default:
                return createResponse(404, 'Not Found', 'handler', 'Invalid path');
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'handler', error.message);
    }
};