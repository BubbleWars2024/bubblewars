import { state } from './state.js';


export async function initHeader() {
    document.getElementById('eats').innerText = state.eats;
}
