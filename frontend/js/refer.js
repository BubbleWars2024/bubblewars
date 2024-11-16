import { pauseGame, resumeGame } from './canvas.js';
import { accessBackend } from './utils.js';


export async function initRefers() {
    document.getElementById('referIcon').addEventListener('click', async () => {
        // Pause game.
        pauseGame();

        // Show refer box.
        document.getElementById('referBox').style.display = 'block';

        // Hide refer icon.
        document.getElementById('referIcon').style.display = 'none';

        // Set refer listener.
        document.getElementById('submitReferFriendButton').addEventListener('click', async () => {
            // Submit refer.
            const data = {
                telegramInitData: window.Telegram.WebApp.initData,
                referTarget: document.getElementById('referFriendInput').value
            }
            const refer = await accessBackend('refer/create', data);
            console.log('refer', refer);

            // Hide refer box,
            document.getElementById('referBox').style.display = 'none';

            // Show refer icon.
            document.getElementById('referIcon').style.display = 'block';

            // Resume game.
            resumeGame();
        });

        // Set exit listener.
        document.getElementById('exitReferFriendButton').addEventListener('click', async () => {
            // Hide refer box,
            document.getElementById('referBox').style.display = 'none';

            // Show refer icon.
            document.getElementById('referIcon').style.display = 'block';

            // Resume game.
            resumeGame();
        });
    });
}
