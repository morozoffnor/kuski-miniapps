<script>
	import { notification } from '../stores.js';

	$:  setTimeout(() => {
		$notification = 'none';
	}, 3000);
</script>
<slot />