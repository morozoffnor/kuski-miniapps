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
        <p class="value">{value || 'TBD'}</p>
    </div>
</Paper>

<style>
    div {
        margin-top: 0;
        margin-bottom: 5;
        font-family: 'Segoe UI', sans-serif;
    }
    p {
        margin-top: 0;
        margin-bottom: 0;
        text-align: center;
    }
    .name {
        font-size: 18px;
        font-weight: bold;
    }
    .value {
        font-size: 20px;
    }
</style>