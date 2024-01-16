import {config} from '$lib/server/config.js';

export async function load({fetch}) {
    const res = await fetch(`http://localhost:3000/user/1345426245`, {
				
    headers: {
        'x-api-token': `${config.BOTAPI_TOKEN}`
    }
});
    const item = await res.json();

    return { item }
}