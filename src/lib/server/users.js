import { config } from './config.js';

const BOTAPI_HOST = config.BOTAPI_HOST || 'http://localhost';
const BOTAPI_PORT = config.BOTAPI_PORT || 3001;
const BOTAPI_TOKEN = config.BOTAPI_TOKEN || 'no';

/**
 * @typedef {Object} User
 * @property {Object} stats - The user's statistics.
 * @property {number} stats.imagesSent - The number of images sent by the user.
 * @property {number} stats.botUses - The number of times the user has used the bot.
 * @property {number} stats.messagesSent - The number of messages sent by the user.
 * @property {number} stats.circlesSent - The number of circles sent by the user.
 * @property {number} stats.videosSent - The number of videos sent by the user.
 * @property {number} stats.voicesSent - The number of voice messages sent by the user.
 * @property {number} stats.stickersSent - The number of stickers sent by the user.
 * @property {number} stats.pollsSent - The number of polls sent by the user.
 * @property {Object} cockStats - The user's cock statistics.
 * @property {number} cockStats.currentSize - The current size of the user's cock.
 * @property {number} cockStats.highestSize - The highest recorded size of the user's cock.
 * @property {number} cockStats.lowestSize - The lowest recorded size of the user's cock.
 * @property {number} cockStats.wins - The number of wins by the user.
 * @property {string} _id - The user's ID.
 * @property {number} userid - The user's user ID.
 * @property {string} userName - The user's username.
 * @property {number} money - The user's money.
 * @property {number} __v - The version key.
 */

/**
 * @param {String} id
 * @returns {Promise<User>}
 */
export async function getUser(id) {
	// make a request to api using token in headers
	const res = await fetch(`${BOTAPI_HOST}:${BOTAPI_PORT}/user/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.API_TOKEN}`,
			'x-api-token': BOTAPI_TOKEN
		}
	});

	return res.json();
}

export async function getAllUsers() {
	const res = await fetch(`${BOTAPI_HOST}:${BOTAPI_PORT}/users/`, {
		headers: {
			Authorization: `Bearer ${process.env.API_TOKEN}`,
			'x-api-token': BOTAPI_TOKEN
		}
	});

	return res.json();
}
