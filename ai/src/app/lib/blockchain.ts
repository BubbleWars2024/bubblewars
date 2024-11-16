import { request, gql } from 'graphql-request';

const GRAPH_API_URL = "https://api.studio.thegraph.com/query/94914/bubble-wars/version/latest"; // The Graph endpoint URL

// GraphQL query to fetch leaderboard data
const LEADERBOARD_QUERY = gql`
{
  bubbles(orderBy:points, orderDirection:desc) {
    id
    points
    lastRaid
  }
}
`;

/**
 * Type definition for the leaderboard data
 */
interface LeaderboardData {
  leaderboards: {
    id: string;
    players: string[];
    scores: number[];
  }[];
}

/**
 * Fetches the leaderboard data from The Graph
 */
export async function fetchLeaderboard() {
  try {
    const data = await request<LeaderboardData>(GRAPH_API_URL, LEADERBOARD_QUERY);

    if (data && data.leaderboards) {
      const players = data.leaderboards[0]?.players ?? [];
      const scores = data.leaderboards[0]?.scores ?? [];
      return { players, scores };
    }

    return { players: [], scores: [] };
  } catch (error) {
    console.error('Error fetching data from The Graph:', error);
    return null;
  }
}