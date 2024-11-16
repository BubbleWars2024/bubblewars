import { NextRequest, NextResponse } from 'next/server';
import main from '../../lib/index';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const chatQuery = searchParams.get('chatQuery') || '';
        const useLangchain = searchParams.get('langchain') === 'true';
        const gameContext = searchParams.get('gameContext') || '';

        const requestPayload = {
            method: 'GET',
            path: '/api/generate',
            queries: {
                chatQuery: [chatQuery],
                langchain: [useLangchain.toString()],
                gameContext: [gameContext],
            },
            headers: {},
        };

        const response = await main(JSON.stringify(requestPayload));
        const data = JSON.parse(response);
        const status = data.status || 200;
        const body = JSON.parse(data.body);

        return NextResponse.json(body, { status });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}