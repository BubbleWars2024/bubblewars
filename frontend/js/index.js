import { initGame } from './canvas.js';


// Enable warn user before exit.
window.Telegram.WebApp.enableClosingConfirmation();


// Disable vertical swipes.
window.Telegram.WebApp.disableVerticalSwipes();


// Set window color.
window.Telegram.WebApp.setBackgroundColor('#71E9F9');
window.Telegram.WebApp.setHeaderColor('#71E9F9');
window.Telegram.WebApp.setBottomBarColor('#71E9F9');


// Enable debug.
if (
    window.Telegram.WebApp.initData.includes("worldwidewhitewindow")
    || window.Telegram.WebApp.initData.includes("Paranoidsyntaxerror")
    || window.Telegram.WebApp.initData.includes("Wooblay")
) {
    eruda.init();
}


// Init.
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        initGame(),
    ]);
});
