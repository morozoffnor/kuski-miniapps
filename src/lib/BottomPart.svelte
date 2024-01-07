<script>
	/**
	 * @type {null | String}
	 */
	export let text = null;
</script>

<p>
	{#if text}
		{text}
	{:else}
		<p>
			KusochkiBot 2024
			<br />
			<a href="https://github.com/morozoffnor/kuski-miniapps">Source code (Github)</a>
		</p>
	{/if}
</p>

<style>
	p {
		color: whitesmoke;
		text-align: center;
		position: relative;
		text-shadow: 2px 2px #1917175a;
	}
	a {
		color: whitesmoke;
		text-decoration: none;
		text-shadow: 2px 2px #1917175a;
	}
	a:visited {
		color: whitesmoke;
		text-decoration: none;
		text-shadow: 2px 2px #1917175a;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
