/**
 * @typedef {Object} UserData
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

/**
 * Retrieves user data.
 * @returns {UserData} The user data object.
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
export function getUserData() {
    return {
        auth_date: "1704737859",
        chat_instance: "-7877084524503496900",
        chat_type: "group",
        hash: "cafc55e530f97d21bba99293ec80c1051d64b437607705a57ad38bcdd85737f0",
        user: {
            allows_write_to_pm: true,
            first_name: "Igor",
            id: 1345426245,
            is_premium: false,
            language_code: "en",
            last_name: "Morozov",
            username: "igormorozovv"
        }
    };
}