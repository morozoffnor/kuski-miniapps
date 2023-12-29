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
        margin-left: 5px;
        line-height: 0.5;
    }
    p {
        line-height: 0.01;
        margin-left: 5px;
    }
    div {
        position: relative;
        margin-top: 5px;
        margin-bottom: 5px;
        display: table;
        outline-style: dotted;
        width: 300px;
        height: calc(height + 1px);
    }
    div a::before {
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
</style>