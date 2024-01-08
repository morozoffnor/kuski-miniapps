<script>
    /**
     * @typedef {Object} user - The user object.
     * @property {boolean} user.allows_write_to_pm - If the user allows writing to private messages.
     * @property {string} user.first_name - The first name of the user.
     * @property {number} user.id - The ID of the user.
     * @property {boolean} user.is_premium - If the user is premium.
     * @property {string} user.language_code - The language code of the user.
     * @property {string} user.last_name - The last name of the user.
     * @property {string} user.username - The username of the user.
     */

     /** @type {user} */
     export let user;
</script>

<div>
    <p>
        Profile, {user.username}!
    </p>
</div>