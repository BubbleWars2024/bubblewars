// src/app/lib/index.ts
import { Request, Response, route } from './httpSupport';
import OpenAI from 'openai/index.mjs';
import { TappdClient } from '@phala/dstack-sdk';

async function GET(req: Request): Promise<Response> {
    let result = { message: '' };
    const secrets = req.secret || {};
    const queries = req.queries;
    const tappdClient = new TappdClient();

    // Retrieve OpenAI API key from secrets
    const openaiApiKey = secrets.openaiApiKey ? (secrets.openaiApiKey as string) : '';
    if (!openaiApiKey) {
        return new Response(JSON.stringify({ error: 'OpenAI API key not found in secrets' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Generate Remote Attestation
    try {
        const raQuote = await tappdClient.tdxQuote('input');
        console.log('RA Quote:', raQuote);

    } catch (error) {
        console.error('Error generating RA:', error);
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });
    const openAiModel = queries.openAiModel ? queries.openAiModel[0] : 'gpt-3.5-turbo';

    // Get the user's prompt
    const prompt = queries.chatQuery ? (queries.chatQuery[0] as string) : 'Hello, who are you?';

    // Call the OpenAI API
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: openAiModel,
        });

        result.message = completion.choices
            ? (completion.choices[0].message.content as string)
            : 'Failed to get result';
    } catch (error) {
        console.error('OpenAI API Error:', error);
        result.message = 'Error generating response from OpenAI.';
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