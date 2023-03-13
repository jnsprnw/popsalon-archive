<script>
  import { dateFormatter, listFormatter } from '$lib/utils.js';
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="mx-auto max-w-3xl bg-white px-3 pt-20">
  <header class="md:px-6">
    <h1 class="text-xl font-semibold">Popsalon Archiv</h1>
    <h2 class="text-sm">Unvollständig und inoffiziell</h2>
  </header>
  {#if data.events.length}
    <main role="list">
      {#each data.events as post}
        <article
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
                datetime={post.date.date}>{post.date.long}</date
              >
              {#if post.title}<h1 class="my-2">{post.title}</h1>{/if}
            </div>
            {#if post.number}<span class="text-md ml-3 font-semibold text-gray-800"
                >{post.number}</span
              >{/if}
          </header>
          {#if post.url}<a
              class="mt-2 mb-1 inline-block border-b border-b-accent text-sm hover:text-accent"
              href={post.url}
              itemprop="url">Link zur Veranstaltung</a
            >{/if}
          {#if post.guests.length || post.videos.length}
            <main>
              <dl>
                {#if post.guests.length}
                  <dd class="mt-6 mb-4 border-t-2 border-t-black pt-1 text-sm text-gray-800">
                    Gäste
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
                      {#each post.videos as { artist, title, year, rip, played, person }}
                        <li
                          class:line-through={!played}
                          class="mb-3 border-b border-b-gray-200 pb-3 last:border-b-0"
                          itemprop="track"
                          itemscope
                          itemtype="https://schema.org/MusicRecording"
                        >
                          <div class="flex items-start justify-between">
                            <div>
                              <span class="text-lg font-semibold leading-6" itemprop="byArtist"
                                >{artist}</span
                              >{#if title}
                                –
                                <span class="text-lg font-semibold leading-6" itemprop="name"
                                  >{title}</span
                                >{/if}
                              {#if year}<span class="ml-2 text-xs" itemprop=" copyrightYear"
                                  >{year}</span
                                >{/if}
                            </div>
                            {#if rip}<span class="py-0.5 text-xs text-gray-500">RIP</span>{/if}
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
      <a class="border-b border-b-accent hover:text-accent" href="https://jonasparnow.com"
        >Jonas Parnow</a
      ></span
    >
  </footer>
</div>
