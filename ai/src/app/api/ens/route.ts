import { NextRequest, NextResponse } from 'next/server';
import { useEnsName } from 'wagmi';
import { sepolia } from 'wagmi/chains';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    // Validate if the address parameter is provided
    if (!address) {
        return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }

    try {
        const { data: name } = useEnsName({
            address: address as `0x${string}`,
            chainId: sepolia.id,
        });

        if (!name) {
            return NextResponse.json({ message: 'ENS name not found' }, { status: 404 });
        }

        // Return the ENS name
        return NextResponse.json({ name }, { status: 200 });
    } catch (error) {
        console.error('Error fetching ENS name:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}