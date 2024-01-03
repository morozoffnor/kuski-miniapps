<script>
	/**
	 * @type {String} name
	 */
	export let name;
	/**
	 * @type {Number | String} stat
	 */
	export  let stat;
</script>

<div>
	<p>
		{name}
	</p>
	<p>
		{stat}
	</p>
</div>

<style>
	div {
		margin-left: auto;
		margin-right: auto;
		position: relative;
	}

	p {
		width: 110px;
		padding-left: unset;
		text-align: center;
		font-family: 'Comic Sans MS',monospace;
	}
</style>