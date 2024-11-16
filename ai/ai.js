// const EC2_AI_URL = 'http://52.221.193.177:3000/api/generate';
// const boilerplateText = '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';

// /**
//  * Function to fetch the leaderboard data from the AI server
//  */
// async function fetchLeaderboard() {
//     try {
//         const response = await fetch(`${EC2_AI_URL}?chatQuery=Fetch+current+leaderboard`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         console.log('leaderboard response', response);
//         const data = await response.json();

//         if (response.status === 200 && data.message) {
//             console.log('Fetched leaderboard successfully:', data.message);
//             return data.message;
//         } else {
//             console.error('Failed to fetch leaderboard:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching leaderboard from AI:', error.message);
//         return null;
//     }
// }

// /**
//  * Function to convert text to speech using OpenAI's API
//  */
// async function convertTextToSpeech(text) {
//     try {
//         const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${boilerplateText}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'whisper-1',
//                 text: text,
//                 language: 'en'
//             })
//         });

//         const result = await response.json();
//         if (result.audioContent) {
//             return Buffer.from(result.audioContent, 'base64');
//         }
//     } catch (error) {
//         console.error('Error converting text to speech:', error.message);
//         return null;
//     }
// }


/**
 * Function to save audio to a file using a Blob (browser compatible)
 */
function saveAudioToFile(buffer) {
    const blob = new Blob([buffer], { type: 'audio/ogg' });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard_response.ogg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log('Audio file saved as leaderboard_response.ogg');
    return url;
}

/**
 * Main function to fetch the leaderboard and convert it to speech
 */
export async function runLeaderboardAI() {
    try {
        const response = await fetch("https://swfvcqmcfmsbqcn4y6m4blu4rq0rujfh.lambda-url.ap-southeast-1.on.aws/");
        if (!response.ok) {
            console.error('Failed to fetch audio:', response.status);
            return;
        }

        const base64Audio = await response.text();

        // Convert base64 to Blob
        const audioBuffer = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
        const blob = new Blob([audioBuffer], { type: 'audio/ogg' });
        const audioUrl = URL.createObjectURL(blob);

        playAudio(audioUrl);
    } catch (error) {
        console.error('Error fetching audio:', error);
    }
}


/**
 * Function to play audio using HTML audio element
 */
function playAudio(fileSrc) {
    const audioLoop = document.getElementById('audioLoop');
    const audioLoopSource = document.getElementById('audioLoopSource');
    audioLoopSource.src = fileSrc;

    audioLoop.load();
    audioLoop.oncanplaythrough = () => {
        const playPromise = audioLoop.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    };
}
