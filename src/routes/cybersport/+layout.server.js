import {config} from '$lib/server/config.js';
import {getUserData} from './data.js';

export async function load() {
    let user = await getUserData();
    return {
        env: {
            BOTAPI_HOST: config.BOTAPI_HOST,
            BOTAPI_PORT: config.BOTAPI_PORT,
            BOTAPI_TOKEN: config.BOTAPI_TOKEN,
            ENV: config.ENV,
        },
        user: user.user
    }
}