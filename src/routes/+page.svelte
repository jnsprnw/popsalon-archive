<script>
  import { dateFormatter } from '$lib/utils.js';
  import ConditionalLink from '$lib/ConditionalLink.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="mx-auto max-w-3xl bg-white px-3 pt-20">
  <header class="md:px-6">
    <h1 class="text-2xl font-semibold">Popsalon Archiv</h1>
    <h2 class="text-lg">Tobi Müller und Jens Balzer im Deutschen Theater, Berlin</h2>
    <h3 class="text-sm">Unvollständig und inoffiziell</h3>
  </header>
  {#if data.events.length}
    <main role="list">
      {#each data.events as post}
        <article
          role="listitem"
          id={post.id}
          class="mt-16 mb-6 border-b-4 border-black bg-white py-6 pb-16 md:px-6"
          itemprop="event"
          itemscope
          itemtype="https://schema.org/Event"
        >
          <header class="flex justify-between">
            <meta itemprop="name" content="Popsalon – Balzer und Müller laden ein" />
            <meta itemprop="attendee" content="Jens Balzer" />
            <meta itemprop="attendee" content="Tobi Müller" />
            <meta itemprop="location" content="Deutsches Theater, Berlin" />
            <div>
              <date
                class="text-3xl font-bold md:text-5xl"
                itemprop="startDate"
                datetime={post.date.iso}>{post.date.long}</date
              >
              {#if post.title}<h1 class="my-2">{post.title}</h1>{/if}
            </div>
            {#if post.number}<span class="text-md ml-3 font-semibold text-gray-800"
                >{post.number}</span
              >{/if}
          </header>
          <div class="flex items-center gap-x-6">
            {#if post.url}<a
                class="mt-2 mb-1 inline-block text-sm underline decoration-violet-300 hover:text-accent hover:decoration-violet-300"
                href={post.url}
                itemprop="url">Link zur Veranstaltung</a
              >{/if}
            <span class="text-sm">Deutsches Theater, Berlin</span>
          </div>
          {#if post.guests.length || post.videos.length}
            <main>
              <dl>
                {#if post.guests.length}
                  <dd class="mt-6 mb-4 border-t-2 border-t-black pt-1 text-sm text-gray-800">
                    {#if post.guests.length === 1}Gast{:else}Gäste{/if}
                  </dd>
                  <dt>
                    <ul>
                      {#each post.guests as guest}
                        <li
                          class="mb-3 border-b border-b-gray-200 pb-3 text-lg font-semibold leading-6 last:border-b-0"
                          itemprop="attendee"
                        >
                          {guest}
                        </li>
                      {/each}
                    </ul>
                  </dt>
                {/if}
                {#if post.videos.length}
                  <dd class="mt-6 mb-4 border-t-2 border-t-black pt-1 text-sm text-gray-800">
                    Videos
                  </dd>
                  <dt>
                    <ul>
                      {#each post.videos as { artist, title, year, rip, played, person, url }}
                        <li
                          class:line-through={!played}
                          class="mb-3 border-b border-b-gray-200 pb-3 last:border-b-0"
                          itemprop="track"
                          itemscope
                          itemtype="https://schema.org/MusicRecording"
                        >
                          <div class="flex items-start justify-between">
                            <ConditionalLink {url}>
                              <span itemprop="byArtist">{artist}</span
                              >{#if title}&emsp14;–&emsp14;<span itemprop="name">{title}</span>{/if}
                            </ConditionalLink>
                            <div class="flex items-center gap-x-2">
                              {#if year}<span class="ml-2 text-xs" itemprop=" copyrightYear"
                                  >{year}</span
                                >{/if}
                              {#if rip}<span class="py-0.5 text-xs">RIP</span>{/if}
                            </div>
                          </div>
                          {#if person}
                            <div class="mt-0.5 text-sm text-gray-500">{person}</div>
                          {/if}
                        </li>
                      {/each}
                    </ul>
                  </dt>
                {/if}
              </dl>
            </main>
          {/if}
        </article>
      {/each}
    </main>
  {/if}
  <footer class="my-16 px-6">
    <span
      >Zuletzt aktualisiert {dateFormatter(new Date())} von
      <a
        class="underline decoration-violet-300 hover:text-accent hover:decoration-violet-300"
        href="https://jonasparnow.com">Jonas Parnow</a
      ></span
    >
  </footer>
</div>
