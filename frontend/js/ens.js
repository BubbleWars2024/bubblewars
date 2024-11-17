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
    console.log('ensName', ensName);
    if (state.ens) {
        document.getElementById('username').innerText = state.ens;
    }
}


export async function getPlayerEnsName(address) {
    const data = {
        address
    };
    let ensName = await accessBackend('ens/name', data);
    // Trim address to first 6 characters.
    if (!ensName) {
        ensName = address.slice(0, 6);
    }
    console.log('ensName', ensName);
    return ensName;
}
