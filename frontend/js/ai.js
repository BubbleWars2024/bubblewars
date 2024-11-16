/**
 * Function to fetch the leaderboard data from the AI server
 */
async function fetchLeaderboard() {
    try {
        const response = await fetch("https://swfvcqmcfmsbqcn4y6m4blu4rq0rujfh.lambda-url.ap-southeast-1.on.aws/", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('DEBUG', response.status);

        if (!response.ok) {
            console.error('Failed to fetch leaderboard:', response.status);
            return null;
        }

        const data = await response.json();
        if (data.message) {
            console.log('Fetched leaderboard successfully:', data.message);
            return data.message;
        } else {
            console.error('No message found in response:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching leaderboard from AI:', error.message);
        return null;
    }
}

/**
 * Function to slide the text down the screen
 */
function slideText(text) {
    const textElement = document.createElement('div');
    textElement.className = 'sliding-text';
    textElement.textContent = text;
    document.body.appendChild(textElement);

    // Remove the element after the animation completes
    textElement.addEventListener('animationend', () => {
        textElement.remove();
    });
}

/**
 * Main function to fetch and display the leaderboard text
 */
export async function runLeaderboardAI() {
    const leaderboardText = await fetchLeaderboard();
    if (leaderboardText) {
        slideText(leaderboardText);
    }
}
