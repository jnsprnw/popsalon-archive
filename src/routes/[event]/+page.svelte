<script lang="ts">
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
</script>

{JSON.stringify(data.post)}
