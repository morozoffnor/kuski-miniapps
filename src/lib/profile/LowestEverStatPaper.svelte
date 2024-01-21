<script>
    import { Paper } from '@svelteuidev/core'
    export let name;
    export let value;
</script>

<Paper shadow="lg" radius="md" withBorder>
    <div>
        <p class="name">{name}</p>
    </div>
    <div>
        <p class="value">{value}</p>
    </div>
</Paper>

<style>
    div {
        margin-top: 0;
        margin-bottom: 5;
        font-family: 'Alegreya Sans', sans-serif;
    }
    p {
        margin-top: 0;
        margin-bottom: 0;
        font-family: 'Alegreya Sans', sans-serif;
        text-align: center;
    }
    .name {
        font-size: 18px;
        font-weight: bold;
    }
    .value {
        font-size: 30px;
    }
</style>