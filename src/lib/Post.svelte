<script>
  import Authors from '$lib/Authors.svelte';
  import Relation from '$lib/Icons/Relation.svelte';
  import Favorite from '$lib/Icons/Favorite.svelte';
  import Link from '$lib/Icons/Link.svelte';

  export let post = {};
  export let showFull = false;
  $: lang = language?.label === 'German' ? 'de' : 'en-GB';

  $: ({
    id,
    url,
    title,
    created_at,
    edited_at,
    published_at,
    date,
    description,
    language,
    tags,
    authors,
    publisher,
    format,
    favourite,
    via,
    viaLink,
    relations,
    image,
    schema,
    relatives,
    text,
    quote,
    content,
  } = post);
</script>

<article
  class="mt-12 mb-16 grid grid-cols-3 border-b-2 border-slate-700 pb-16 dark:border-neutral-700 md:mb-24 md:pb-24"
  itemscope
  itemtype={`https://schema.org/${schema}`}
  {id}
  role={showFull ? '' : 'listitem'}
>
  <meta itemprop="inLanguage" content={lang} />
  <header class="col-span-3">
    <div class="flex justify-between">
      <span
        class="col-span-3 pb-2 text-xs font-semibold uppercase tracking-wider text-accent"
        lang="en-GB"
      >
        {format}
      </span>
      {#if favourite}
        <Favorite />
      {/if}
    </div>
    <a href={`/${id}`} rel="external" class="transition-colors hover:text-accent" itemprop="url">
      <h1 class="mb-2 text-3xl leading-tight md:text-4xl lg:text-5xl" {lang} itemprop="name">
        {title}
      </h1>
      <span class="text-sm">
        <Authors authors={authors.map((author) => author.label)} {lang} />
      </span>
    </a>
  </header>
  <main class="col-span-3 my-6 border-y border-slate-200 py-6 dark:border-neutral-700">
    {#if content.length}
      <div itemprop="description">
        {#each content as block, index}
          <p
            class:mb-2={index != content.length - 1}
            class:text-xl={content.length === 1}
            class:md:text-2xl={content.length === 1}
          >
            {#each block as { text, href }}
              {#if href}
                <a {href} class="border-b border-b-accent hover:text-accent">{text}</a>
              {:else}
                {text}
              {/if}
            {/each}
          </p>
        {/each}
      </div>
    {:else if image}
      <img
        class=""
        src={image}
        alt={`${format} by ${new Intl.ListFormat('en', {
          style: 'long',
          type: 'conjunction',
        }).format(authors.map((author) => author.label))}`}
      />
    {:else if text.length}
      <p class="text-xl md:text-2xl" itemprop="description">
        {#each text as { plain_text, href }}{#if href}<a
              {href}
              class="border-b border-b-accent hover:text-accent">{plain_text}</a
            >{:else}{@html plain_text.replace(/(?:\r\n|\r|\n)/g, '<br>')}{/if}{/each}
      </p>
    {:else if quote.text.length}
      <figure itemprop="description">
        <blockquote cite={url} class="mb-2">
          <p class="text-xl md:text-2xl">“{quote.text}”</p>
        </blockquote>
        <figcaption class="text-base">— {quote.author}</figcaption>
      </figure>
    {:else}
      <p class="text-xl md:text-2xl" {lang} itemprop="description">
        {description}
      </p>
    {/if}
  </main>
  <footer class="col-span-3 flex justify-between text-sm">
    <a href={`/${id}`} class="hover:text-accent"
      ><time class="text-center text-sm" datetime={published_at.string}>{published_at.label}</time
      ></a
    >
    {#if via}
      {#if viaLink}
        <span>via <a href={viaLink} class="transition-colors hover:text-accent">{via}</a></span>
      {:else}
        <span>via {via}</span>
      {/if}
    {/if}
    <a class="flex items-center text-right text-sm hover:text-accent" href={url}>
      <span {lang} itemprop="publisher">{publisher}</span>
      <Link />
    </a>
  </footer>
  {#if (relations.length || relatives.length) && showFull}
    <aside class="col-span-3 mt-6">
      <h4 class="mt-6 mb-2 text-2xl">Related posts</h4>
      <ul>
        {#each relatives as { title, id, same, language, isRelated }}
          {@const lang = language?.Label === 'Deutsch' ? 'de' : 'en-GB'}
          <li>
            <a
              href={`/${id}`}
              class="mb-2 flex flex-col items-start gap-0 text-gray-800 hover:text-accent dark:text-neutral-300"
            >
              <span class="flex items-center gap-2 text-xl" {lang}
                >{#if isRelated}<Relation />{/if}
                {title}</span
              >
              <small class="text-sm text-gray-400 dark:text-neutral-400"
                >same {new Intl.ListFormat('en', {
                  style: 'long',
                  type: 'conjunction',
                }).format(same)}</small
              >
            </a>
          </li>
        {/each}
      </ul>
    </aside>
  {/if}
</article>
