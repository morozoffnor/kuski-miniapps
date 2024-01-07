<script>
	/**
	 * @type {String}
	 */
	export let name;

	/**
	 * @type {Number}
	 */
	export let lowest;

	/**
	 * @type {Number}
	 */
	export let id;
</script>

<div>
	<h2><a href="/user/{id}">{name}</a></h2>
	<p>Lowest today: {lowest}, lowest ever: {lowest}</p>
</div>

<style>
	h2 {
		margin-left: 20px;
		line-height: 0.5;
	}
	p {
		line-height: 0.01;
		margin-left: 20px;
		color: grey;
		font-family: 'Comic Sans MS', monospace;
		font-size: small;
	}
	div {
		margin-left: auto;
		margin-right: auto;
		position: relative;
		margin-top: 5px;
		margin-bottom: 5px;
		display: table;
		/* outline-style: dotted; */
		outline-color: whitesmoke;
		width: 300px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.15);
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

		backdrop-filter: blur(15px);
	}
	div a::before {
		content: '';
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}
	a {
		font-family: 'Comic Sans MS', monospace;
		padding-bottom: 1px;
		color: whitesmoke;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
