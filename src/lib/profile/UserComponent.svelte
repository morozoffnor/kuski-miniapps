<script>

    import { botUser } from "../../routes/user/stores";
    import { Grid, Badge, Group, Progress } from '@svelteuidev/core';

    let exp = ($botUser.lvl.exp % 1000)

</script>

<Grid justify="center" spacing="xs" align="flex-end">
    <Grid.Col span={12}>
        <Group position="center">
            <h1>
                {$botUser.userName}
            </h1>
            <div class="badge">
                <Badge size="lg" radius="md" variant="outline">
                    {$botUser.lvl.lvl} lvl
                  </Badge>   
            </div>
        </Group>
    </Grid.Col>
    <Grid.Col span={12}>
        <div class="progress">
            <Progress
                size="lg"
                value={exp/10}
            />
            {exp} / 1000 exp
        </div>

    </Grid.Col>
</Grid>

<style>
    h1 {
        font-family: 'Segoe UI', sans-serif;
        color: white;
        display: inline;
        margin-bottom: 0;
        margin-top: 0;
        
    }
    .badge {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
        display: flex;
        justify-content: bottom;
        position: relative;
    }
    .progress {
        padding-left: 5%;
        padding-right: 5%;
        text-align: center;
        font-family: 'Segoe UI', sans-serif;
    }
</style>

