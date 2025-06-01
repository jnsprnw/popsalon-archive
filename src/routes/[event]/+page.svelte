<script lang="ts">
  import Event from '$lib/Event/Event.svelte';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
</script>

<div
  class="flex flex-row items-center text-center justify-between text-xs/tight sm:text-sm/tight md:px-6 mt-12 gap-x-2"
>
  {#if data.previousEvent}
    <a
      rel="prev"
      class="place-self-start underline transition-colors decoration-accent hover:text-accent hover:decoration-accent focus:text-accent"
      href="/{data.previousEvent}">Vorherige Veranstaltung</a
    >
  {:else}
    <span class="text-gray-300">Vorherige Veranstaltung</span>
  {/if}
  <a
    class="place-self-center underline transition-colors decoration-accent hover:text-accent hover:decoration-accent focus:text-accent"
    href="/">Alle Veranstaltungen</a
  >
  {#if data.nextEvent}
    <a
      rel="next"
      class="place-self-end underline transition-colors decoration-accent hover:text-accent hover:decoration-accent focus:text-accent"
      href="/{data.nextEvent}">Nächste Veranstaltung</a
    >
  {:else}
    <span class="text-gray-300">Nächste Veranstaltung</span>
  {/if}
</div>

<Event event={data.event} />
