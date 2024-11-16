import { state } from './state.js';


export async function initHeader() {
    document.getElementById('eats').innerText = state.eats;
}


export async function initFooter() {
    document.getElementById('username').innerText = state.user.username || 'no ENS set';
}
