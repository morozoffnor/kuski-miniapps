<script>
// @ts-nocheck

    import { Button, Flex, Paper, Text, Alert } from '@svelteuidev/core';
    import { InfoCircled } from 'radix-icons-svelte';

    export let item
</script>

<Paper withBorder>
    {#if item.effect.title != ''}
        <div>
            {item.effect.title}
        </div>
    {/if}
    <ul>
        {#each item.effect.descriptions as description}
            <li>{description}</li>
        {/each}
    </ul>
    {#if item.effect.alert != ''}
        <Alert icon={InfoCircled}  title="Внимание!" color="red" variant="outline" radius="md">
            {item.effect.alert}
        </Alert>
    {/if}
    
</Paper>

<style>
    ul {
        padding-left: 20;
        margin-top: 0;
        margin-bottom: 5;
        font-family: 'Segoe UI', sans-serif;
    }
    div {
        font-family: 'Segoe UI', sans-serif;
    }
</style>