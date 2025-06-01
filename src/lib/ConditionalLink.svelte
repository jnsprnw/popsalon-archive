<script lang="ts">
  const { url, children } = $props();
</script>

{#if url}
  <a
    href={url}
    class="text-lg font-semibold leading-6 underline decoration-violet-300 hover:text-accent hover:decoration-accent"
  >
    {@render children?.()}
  </a>
{:else}
  <div class="text-lg font-semibold leading-6">
    {@render children?.()}
  </div>
{/if}
