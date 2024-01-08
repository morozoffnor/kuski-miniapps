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

	import FirstTime from "../components/FirstTime.svelte";
	import Profile from "../components/Profile.svelte";

     /** @type {user} */
    export let user;
    export let menu = 1;
</script>
<!-- <div class="menu">

</div> -->
<div>
    <ul class="menu">
        <li class="menu"><a href="/" on:click|preventDefault={() => (menu = 1)}>Home</a></li> |
        <li class="menu"><a href="/" on:click|preventDefault={() => (menu = 2)}>{user.username}</a></li>
    </ul>
</div>


{#if menu === 1}
    <FirstTime user={user}/>
{:else if menu === 2}
    <Profile user={user}/>
{:else}
<h1>
	Page Not Found
</h1>
{/if}

<style>
    li.menu {
        display : inline;
    }
    div {
        margin-top: 5px;
        display: flex; 
        justify-content: flex-end
		
    }
    a:visited {
		font-family: 'Ubuntu';
		color: whitesmoke;
		text-decoration: none;
	}
</style>