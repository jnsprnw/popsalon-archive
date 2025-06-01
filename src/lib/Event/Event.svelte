<script lang="ts">
  import ConditionalLink from '$lib/ConditionalLink.svelte';

  type Props = {
    event: any;
  };

  const { event }: Props = $props();
</script>

<div
  class="mt-16 border-b-4 pb-16 md:px-6"
  itemprop="event"
  itemscope
  itemtype="https://schema.org/Event"
>
  <header class="flex flex-wrap justify-between">
    <meta itemprop="name" content="Popsalon – Balzer und Müller laden ein" />
    <date class="text-3xl font-bold md:text-5xl" itemprop="startDate" datetime={event.date.iso}>
      {event.date.long}
    </date>
    {#if event.number}
      <span class="text-md ml-3 font-semibold text-gray-800">
        {event.number}
      </span>
    {/if}
    {#if event.title}<h1 class="my-2 text-xl block w-full">{event.title}</h1>{/if}
  </header>
  <div class="flex items-center gap-x-6">
    {#if event.url}<a
        class="mt-2 mb-1 inline-block text-sm underline transition-colors decoration-accent hover:text-accent hover:decoration-accent focus:text-accent"
        href={event.url}
        itemprop="url">Link zur Veranstaltung</a
      >{/if}
    <span class="text-sm" itemprop="location">Deutsches Theater, Berlin</span>
    <span class="text-sm">{event.date.day}</span>
  </div>
  {#if event.guests.length || event.videos.length}
    {#if event.guests.length}
      <span class="mt-6 block mb-4 border-t-2 border-t-black pt-1 text-sm text-gray-800">
        {#if event.guests.length === 1}Gast{:else}Gäste{/if}
      </span>
      <ul>
        <meta itemprop="attendee" content="Jens Balzer" />
        <meta itemprop="attendee" content="Tobi Müller" />
        {#each event.guests as guest}
          <li
            class="mb-3 border-b border-b-gray-200 pb-3 text-lg font-semibold leading-6 last:border-b-0"
            itemprop="attendee"
          >
            {guest}
          </li>
        {/each}
      </ul>
    {/if}
    {#if event.videos.length}
      <span class="mt-6 block mb-4 border-t-2 border-t-black pt-1 text-sm text-gray-800">
        Videos
      </span>
      <ul>
        {#each event.videos as { artist, title, year, rip, played, person, url }}
          <li
            class:line-through={!played}
            class="mb-3 border-b border-b-gray-200 pb-3 last:border-b-0"
            itemprop="track"
            itemscope
            itemtype="https://schema.org/MusicRecording"
          >
            <div class="flex items-start justify-between">
              <ConditionalLink {url}>
                <span itemprop="byArtist">{artist}</span>{#if title}&emsp14;–&emsp14;<span
                    itemprop="name">{title}</span
                  >{/if}
              </ConditionalLink>
              <div class="flex items-center gap-x-2">
                {#if year}<span class="ml-2 text-xs" itemprop=" copyrightYear">{year}</span>{/if}
                {#if rip}<span class="py-0.5 text-xs">RIP</span>{/if}
              </div>
            </div>
            {#if person}
              <span class="mt-0.5 text-sm text-gray-500">{person}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
