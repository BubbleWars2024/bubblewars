import { state } from './state.js';

export async function initHeader() {
    document.getElementById('username').innerText = state.user.username || 'no ENS set';
    document.getElementById('score').innerText = state.score;
}
