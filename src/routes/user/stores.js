// @ts-nocheck
import { writable } from 'svelte/store';
/** 
* @typedef {Object} userData
* @property {string} auth_date - The authentication date.
* @property {string} chat_instance - The chat instance.
* @property {string} chat_type - The type of chat.
* @property {string} hash - The hash.
* @property {Object} user - The user object.
* @property {boolean} user.allows_write_to_pm - If the user allows writing to private messages.
* @property {string} user.first_name - The first name of the user.
* @property {number} user.id - The ID of the user.
* @property {boolean} user.is_premium - If the user is premium.
* @property {string} user.language_code - The language code of the user.
* @property {string} user.last_name - The last name of the user.
* @property {string} user.username - The username of the user.
*/

export const tgUserData = writable({});
export const botUser = writable({});
export const modalButtonState = writable({});