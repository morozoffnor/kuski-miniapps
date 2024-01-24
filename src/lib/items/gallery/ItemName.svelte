<script>
	import { Divider, Paper, Text } from '@svelteuidev/core';
	export let name
</script>

<Divider />
<Text
	component='span'
	align='left'
	variant='gradient'
	size='xl'
	weight='bold'
	gradient={{ from: 'gray', to: 'gray', deg: 46 }}
>
	{name}
</Text>

