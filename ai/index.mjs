import fetch from 'node-fetch';

const EC2_AI_URL = process.env.EC2_URL;
const openAiApiKey = process.env.OPENAI_KEY;

export const handler = async (event) => {
    // Handle CORS preflight request
    if (event.requestContext.http.method === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: null,
        };
    }

    try {
        // Step 1: Fetch the leaderboard data from EC2
        const leaderboardResponse = await fetch(`${EC2_AI_URL}?chatQuery=Fetch+current+leaderboard`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!leaderboardResponse.ok) {
            console.error('Failed to fetch leaderboard:', leaderboardResponse.statusText);
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Failed to fetch leaderboard' })
            };
        }

        const leaderboardData = await leaderboardResponse.json();
        const leaderboardText = leaderboardData?.message;

        if (!leaderboardText) {
            console.error('No message found in leaderboard data');
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'No leaderboard message' })
            };
        }

        // Step 2: Convert text to speech using OpenAI
        const ttsResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openAiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'whisper-1',
                text: leaderboardText,
                language: 'en',
            }),
        });

        if (!ttsResponse.ok) {
            console.error('Failed to convert text to speech:', ttsResponse.statusText);
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Failed to convert text to speech' })
            };
        }

        const ttsData = await ttsResponse.json();
        const audioContent = ttsData?.audioContent;

        if (!audioContent) {
            console.error('No audio content returned from OpenAI');
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'No audio content returned' })
            };
        }

        // Step 3: Convert the base64 audio content to a Buffer
        const audioBuffer = Buffer.from(audioContent, 'base64');

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'audio/ogg',
            },
            body: audioBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error('Error in Lambda function:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
