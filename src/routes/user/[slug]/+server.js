import { getUser } from '$lib/server/users';

/**
 * @param {String} id - The user's ID.
 */
export async function GET(id) {
	return getUser(id);
}
