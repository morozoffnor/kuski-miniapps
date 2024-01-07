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
		color: black;
		text-align: center;
		position: relative;
	}
	a {
		color: black;
		text-decoration: none;
	}
	a:visited {
		color: black;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
