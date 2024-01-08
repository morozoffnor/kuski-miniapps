import {config} from '$lib/server/config.js';

export async function load() {
    return {
        env: {
            BOTAPI_HOST: config.BOTAPI_HOST,
            BOTAPI_PORT: config.BOTAPI_PORT,
            BOTAPI_TOKEN: config.BOTAPI_TOKEN,
        }
    }
}