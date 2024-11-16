import { request, gql } from 'graphql-request';

const GRAPH_API_URL = "https://api.studio.thegraph.com/query/94914/bubble-wars/version/latest";

// GraphQL query to fetch leaderboard data
const LEADERBOARD_QUERY = gql`
{
  bubbles(orderBy: points, orderDirection: desc) {
    id
    points
    lastRaid
  }
}
`;

interface Bubble {
  id: string;
  points: string; // Updated to handle points as a string
  lastRaid: string;
}

export async function fetchLeaderboard() {
  try {
    const data = await request<{ bubbles: Bubble[] }>(GRAPH_API_URL, LEADERBOARD_QUERY);

    if (data && data.bubbles.length > 0) {
      // Convert points to numbers
      const leaderboard = data.bubbles.map((entry) => ({
        id: entry.id,
        points: parseInt(entry.points, 10),
        lastRaid: entry.lastRaid,
      }));

      console.log('Leaderboard:', leaderboard);
      return leaderboard;
    }

    console.log('No data found');
    return [];
  } catch (error) {
    console.error('Error fetching data from The Graph:', error);
    return null;
  }
}