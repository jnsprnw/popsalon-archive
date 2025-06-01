<script>
	import { getContext } from 'svelte';
	const updated_time = getContext('updated_time');
	import { formatDate } from '$lib/utils';
</script>

<footer class="mb-12 grid grid-cols-2 text-sm">
	<time datetime={updated_time.toISOString()}>Updated {formatDate(updated_time, true)}</time>
	<a class="hover:text-accent text-right text-sm" href="https://jonasparnow.com" rel="me"
		>jonasparnow.com</a
	>
</footer>
