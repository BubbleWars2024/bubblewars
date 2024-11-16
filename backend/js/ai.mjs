import { createResponse } from './utils.mjs';


export async function fetchLeaderboard() {
    try {
        console.log('Fetching leaderboard from EC2 URL:', process.env.EC2_URL);
        const leaderboardResponse = await fetch(`${process.env.EC2_URL}?chatQuery=Fetch+current+leaderboard`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const leaderboardData = await leaderboardResponse.json();
        const leaderboardText = leaderboardData?.message;
        return createResponse(200, 'OK', 'fetchLeaderboard', 'Leaderboard fetched', { leaderboardText });
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'fetchLeaderboard', `Failed to fetch leaderboard: ${error.message}`);
    }
}
