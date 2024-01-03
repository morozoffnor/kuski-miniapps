import { getAllUsers } from '$lib/server/users.js';
import {error} from '@sveltejs/kit'


/**
 * @typedef {Object} Stats
 * @property {number|undefined} imagesSent - The number of images sent by the user.
 * @property {number|undefined} botUses - The number of times the user has used the bot.
 * @property {number|undefined} messagesSent - The number of messages sent by the user.
 * @property {number|undefined} circlesSent - The number of circles sent by the user.
 * @property {number|undefined} videosSent - The number of videos sent by the user.
 * @property {number|undefined} voicesSent - The number of voice messages sent by the user.
 * @property {number|undefined} stickersSent - The number of stickers sent by the user.
 * @property {number|undefined} pollsSent - The number of polls sent by the user.
 * @index {{[index:string]: number|null}} stats - Index signature to make the object indexable with a string.
 */

/**
 * @typedef {Object} CockStats
 * @property {number|null} currentSize - The current size of the user's cock.
 * @property {number|null} highestSize - The highest recorded size of the user's cock.
 * @property {number|null} lowestSize - The lowest recorded size of the user's cock.
 * @property {number|null} wins - The number of wins by the user.
 */

/**
 * @typedef {Object} User
 * @property {Stats} stats - The user's statistics.
 * @property {CockStats} cockStats - The user's cock statistics.
 * @property {string} _id - The user's ID.
 * @property {number} userid - The user's user ID.
 * @property {string} userName - The user's username.
 * @property {number} money - The user's money.
 * @property {number} __v - The version key.
 */

/**
 * @typedef {User[]} Users - An array of user objects.
 */

export async function load() {
    const users = await getAllUsers();
    
    if (!users) throw error(404)

    return {
        users: users.map((/** @type {{ userid: Number; userName: String; cockStats: { lowestSize: Number; }; }} */ user) => ({
            id: user.userid,
            name: user.userName,
            lowest: user.cockStats.lowestSize
        }))
    };
}

// returns 