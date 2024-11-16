import { Request, Response, route } from './httpSupport';
import OpenAI from 'openai/index.mjs';
import { TappdClient } from '@phala/dstack-sdk';
import { execSync } from 'child_process';
import { fetchLeaderboard } from './blockchain';

async function GET(req: Request): Promise<Response> {
    let result = { message: '' };
    const secrets = req.secret || {};
    const queries = req.queries;
    const tappdClient = new TappdClient();

    const openaiApiKey = secrets.openaiApiKey ? (secrets.openaiApiKey as string) : '';
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




        // Use Open AI to generate response based on on-chain leaderboard context.
        const onChainData = await fetchLeaderboard();
        let onChainContext = 'On-chain data not available';
        if (onChainData) {
            const { players, scores } = onChainData;
            onChainContext = `Current leaderboard: ${players.map((p: any, i: any) => `${p}: ${scores[i]}`).join(', ')}`;
        }

        const prompt = queries.chatQuery ? queries.chatQuery[0] as string : 'Hello, who are you?';
        const openai = new OpenAI({ apiKey: openaiApiKey });
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: `You have access to on-chain data: ${onChainContext}` },
                { role: 'user', content: prompt }
            ],
            model: 'gpt-3.5-turbo',
        });

        result.message = completion.choices
            ? (completion.choices[0].message.content as string)
            : 'Failed to get result';
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