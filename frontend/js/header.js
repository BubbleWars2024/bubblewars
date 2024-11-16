import { state } from './state.js';


export async function initHeader() {
    document.getElementById('eats').innerText = state.eats;
    document.getElementById('refers').innerText = state.refers;
}


export async function initFooter() {
    document.getElementById('username').innerText = state.user.username || 'no ENS set';
}
