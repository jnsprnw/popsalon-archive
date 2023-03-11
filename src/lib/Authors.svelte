<script>
  export let authors;
  export let lang = 'en-GB';

  const parts = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).formatToParts(
    authors
  );
</script>

<span lang="en-GB">By</span>
{#each parts as { type, value }}
  {#if type === 'literal'}
    <span lang="en-GB">{value}</span>
  {:else}
    <span itemscope itemtype="https://schema.org/Person" {lang}
      ><span itemprop="name">{value}</span></span
    >
  {/if}
{/each}
