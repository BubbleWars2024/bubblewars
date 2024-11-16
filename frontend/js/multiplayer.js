export async function getPlayers() {
    const query = `
        query Subgraphs {
            bubbles(first: 5) {
                id
                points
                lastRaid
            }
            raids(first: 5) {
                id
                raider
                defender
                loser
            }
        }
    `;

    const url = 'https://api.studio.thegraph.com/query/94914/bubble-wars/version/latest';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                operationName: 'Subgraphs',
                variables: {}
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Data:', result.data);
        return result.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
