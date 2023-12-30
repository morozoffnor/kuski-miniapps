<script>
	export let text = null
</script>


<p>
	{#if text}
		{text}
	{:else}
		<p>
			KusochkiBot 2024
			<br>
			<a href="https://github.com/morozoffnor">Source code (Github)</a>
		</p>
	{/if}
</p>

<style>
	p {
      color: dimgrey;
			text-align: center;
			position: relative;
	}
	a {
      color: dimgrey;
      text-decoration: none;
	}
  a:visited {
      color: dimgrey;
      text-decoration: none;
  }

  a:hover {
      text-decoration: underline;
  }
</style>