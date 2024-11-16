import { accessBackend } from './utils.js';
import { state } from './state.js';

export async function name() {
    // Get ens name
    const data = {
        telegramUserId: state.user.telegramUserId
    };
    const getEnsName = await accessBackend('user/read', data);
    console.log('ENS Name', getEnsName.userRecord.ens);
    document.getElementById('username').innerText = getEnsName.userRecord.ens || 'no ENS set';
}