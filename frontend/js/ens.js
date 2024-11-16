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
    const ensName = await provider.lookupAddress(readUser.walletAddress);
    state.ens = ensName;
    if (state.ens) {
        document.getElementById('username').innerText = state.ens;
    }
}
