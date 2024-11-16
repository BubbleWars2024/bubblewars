// This is a hacky solution, and not recommended to read from a hardcoded L2 address, but fine for a hackathon
import { Hex, createPublicClient, http, namehash, parseAbi } from 'viem'
import { baseSepolia, sepolia } from 'viem/chains'
import { NextRequest, NextResponse } from 'next/server';

const evmChainIdToCoinType = (chainId: number) => {
    return (0x80000000 | chainId) >>> 0
}

const getReverseNamespace = (chainId: number) =>
    `${evmChainIdToCoinType(chainId).toString(16)}.reverse`

const getReverseNode = (address: Hex, chainId: number) => {
    const reverseNamespace = getReverseNamespace(chainId)
    return `${address.toLowerCase().slice(2)}.${reverseNamespace}`
}

const getReverseNodeHash = (address: Hex, chainId: number) => {
    const reverseNode = getReverseNode(address, chainId)
    return namehash(reverseNode)
}

const l1Client = createPublicClient({
    chain: sepolia,
    transport: http('https://sepolia.drpc.org'),
})

const l2Client = createPublicClient({
    chain: baseSepolia,
    transport: http('https://base-sepolia.drpc.org'),
})

// https://github.com/ensdomains/ens-contracts/blob/feature/simplify-reverse-resolver/deployments/base/L2ReverseResolver.json
const l2ReverseResolverAbi = parseAbi([
    'function node(address) view returns (bytes32)',
    'function name(bytes32) view returns (string)',
])

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') as Hex;

    // Validate if the address parameter is provided
    if (!address) {
        return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }

    const chainId = baseSepolia.id
    const node = getReverseNodeHash(address, chainId)
    const l2ReverseResolver = '0xa12159e5131b1eEf6B4857EEE3e1954744b5033A' as Hex

    const reverseName = await l2Client.readContract({
        address: l2ReverseResolver,
        abi: l2ReverseResolverAbi,
        functionName: 'name',
        args: [node],
    })

    const forwardAddr = await l1Client.getEnsAddress({
        name: reverseName,
        coinType: evmChainIdToCoinType(chainId),
    })

    if (forwardAddr?.toLowerCase() === address.toLowerCase()) {
        return reverseName
    }

    return null
}