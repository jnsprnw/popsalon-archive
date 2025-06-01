<script>
	import Event from '$lib/Event/Event.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	const { data } = $props();
</script>

{#if data.events.length}
	<main class="flex flex-col gap-y-6">
		{#each data.events as event (event.date.iso)}
			<Event {event} />
		{/each}
	</main>
{/if}
