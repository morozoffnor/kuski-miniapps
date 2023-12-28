
import { error } from '@sveltejs/kit'
import {getUser} from '$lib/server/users.js'


/**
 * 
 * @param {*} params 
 * @returns 
 */

export async function load({params}) {
    if (typeof params.slug !== 'string') {
        throw new Error('Invalid parameter');
    }
    const user = await getUser(params.slug);

    if (!user) throw error(404);

    return {
        slug: params.slug,
        money: user.money,
        userName: user.userName
    }
}