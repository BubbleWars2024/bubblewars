import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'wagmi/chains';
import { getEnsName } from 'viem/ens';

const client = createPublicClient({
    chain: sepolia,
    transport: http(),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    // Validate if the address parameter is provided
    if (!address) {
        return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }

    try {
        // Fetch ENS name using viem
        const ensName = await getEnsName(client, { address: address as `0x${string}` });

        if (!ensName) {
            return NextResponse.json({ message: 'ENS name not found' }, { status: 404 });
        }

        // Return the ENS name
        return NextResponse.json({ name: ensName }, { status: 200 });
    } catch (error) {
        console.error('Error fetching ENS name:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}