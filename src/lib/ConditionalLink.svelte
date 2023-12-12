<script>
  export let url;
</script>

{#if url}
  <a
    href={url}
    class="text-lg font-semibold leading-6 underline decoration-violet-300 hover:text-accent hover:decoration-accent"
  >
    <slot />
  </a>
{:else}
  <div class="text-lg font-semibold leading-6">
    <slot />
  </div>
{/if}
