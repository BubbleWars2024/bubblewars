import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();


const EC2_AI_URL = 'http://52.221.193.177:3000/api/generate';
const openAiApiKey = process.env.OPENAI_API_KEY;

/**
 * Function to fetch the leaderboard data from the AI server
 */
async function fetchLeaderboard() {
    try {
        const response = await fetch(`${EC2_AI_URL}?chatQuery=Fetch+current+leaderboard`);

        if (response.status === 200 && response.data.message) {
            console.log('Fetched leaderboard successfully:', response.data.message);
            return response.data.message;
        } else {
            console.error('Failed to fetch leaderboard:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching leaderboard from AI:', error.message);
        return null;
    }
}

/**
 * Function to convert text to speech using OpenAI's text-to-speech API
 */
async function convertTextToSpeech(text) {
    try {
        const ttsResponse = await axios.post(
            'https://api.openai.com/v1/audio/transcriptions',
            {
                model: 'whisper-1',
                text: text,
                language: 'en'
            },
            {
                headers: {
                    'Authorization': `Bearer ${openAiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const audioBuffer = Buffer.from(ttsResponse.data.audioContent, 'base64');
        return audioBuffer;
    } catch (error) {
        console.error('Error converting text to speech:', error.message);
        return null;
    }
}

/**
 * Function to save the audio buffer to a file
 */
function saveAudioToFile(buffer, fileName = 'leaderboard_response.ogg') {
    try {
        fs.writeFileSync(fileName, buffer);
        console.log(`Audio file saved as ${fileName}`);
    } catch (error) {
        console.error('Error saving audio file:', error.message);
    }
}

/**
 * Main function to fetch the leaderboard and convert it to speech
 */
async function main() {
    const leaderboardText = await fetchLeaderboard();

    if (leaderboardText) {
        const audioBuffer = await convertTextToSpeech(leaderboardText);
        if (audioBuffer) {
            saveAudioToFile(audioBuffer);
        }
    }
}

main();