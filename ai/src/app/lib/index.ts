import { Request, Response, route } from './httpSupport';
import OpenAI from 'openai/index.mjs';
import { TappdClient } from '@phala/dstack-sdk';
import { execSync } from 'child_process';
import { fetchLeaderboard } from './blockchain';
import dotenv from 'dotenv';
dotenv.config();

async function GET(req: Request): Promise<Response> {
    let result = { message: '' };
    const queries = req.queries;
    const tappdClient = new TappdClient();

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
        return new Response(JSON.stringify({ error: 'OpenAI API key not found in secrets' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const raQuote = await tappdClient.tdxQuote('input');
        console.log('RA Quote:', raQuote);
    } catch (error) {
        console.error('Error generating RA:', error);
    }

    // --------------- Use Langchain or OpenAI based on query parameter ----------------- //


    // Use Langchain to attack a target and perform an on-chain action if so.
    const isLangchain = queries.langchain ? queries.langchain[0] === 'true' : false;
    if (isLangchain) {
        const gameContext = queries.gameContext ? queries.gameContext[0] : '';

        // Ensure game context is provided
        if (!gameContext) {
            return new Response(JSON.stringify({ error: 'Game context is missing' }), { status: 400 });
        }

        // Call the LangChain agent using Python
        try {
            const langchainResponse = execSync(`python3 my_agent.py "${gameContext}"`).toString();
            result.message = langchainResponse.trim();
        } catch (error) {
            console.error('Langchain Error:', error);
            result.message = 'Error processing Langchain query';
        }




    } else {


        // Fetch leaderboard data from TheGraph
        const leaderboardData = await fetchLeaderboard();
        let onChainContext = 'Leaderboard data not available';

        if (leaderboardData && leaderboardData.length > 0) {
            onChainContext = leaderboardData
                .map((entry: any, index: number) => `${index + 1}. Player ${entry.id}: ${entry.points} points`)
                .join('\n');
        }

        // Generate a response using OpenAI based on the leaderboard context
        const prompt = 'You are a game commentator, you read the leaderboard in a fun, exciting and jokey way, somewhat roasting the players, provide scores and leaders on the leaderboard.';
        const openai = new OpenAI({ apiKey: openaiApiKey });

        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: `You have access to the latest leaderboard data:\n${onChainContext} to influence your commentary.` },
                    { role: 'user', content: prompt }
                ],
                model: 'gpt-3.5-turbo',
            });

            result.message = completion.choices
                ? (completion.choices[0].message.content as string)
                : 'Failed to get result';
        } catch (error) {
            console.error('OpenAI API Error:', error);
            result.message = 'Error generating response from OpenAI.';
        }
    }

    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
    });
}

async function POST(req: Request): Promise<Response> {
    return new Response(JSON.stringify({ message: 'Not Implemented' }));
}

export default async function main(request: string) {
    return await route({ GET, POST }, request);
}