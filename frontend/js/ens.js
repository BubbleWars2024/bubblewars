import { accessBackend } from './utils.js';
import { state } from './state.js';
import { ethers } from 'https://esm.sh/ethers@6.8.1';


export async function initName() {
    const data = {
        telegramInitData: window.Telegram.WebApp.initData
    };
    let readUser = await accessBackend('user/read', data);
    console.log('readUser', readUser);

    const provider = new ethers.JsonRpcProvider('https://sepolia.drpc.org');
    console.log('readUser.walletAddress', readUser.walletAddress);
    const ensName = await provider.lookupAddress(readUser.walletAddress);
    // const ensName = await provider.lookupAddress('0x8f85d07a468d9564c5E37Ca025545704A7258e2b');
    console.log('ensName', ensName);
    state.ens = ensName || 'No ENS found';
    document.getElementById('username').innerText = state.ens;
}
