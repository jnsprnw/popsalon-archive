<script>
  import '$lib/styles/app.css';
  import { title, description, baseURL } from '$lib/config.js';

  const updated_time = new Date();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta name="robots" content="index, follow, noimageindex" />

  <meta property="og:title" content={title} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={`${baseURL}apple-touch-icon.png`} />
  <meta property="og:image:alt" content="Green circle on a white background." />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={title} />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:url" content={baseURL} />
  <meta property="og:updated_time" content={updated_time.toISOString()} />

  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />

  <link rel="canonical" href={baseURL} />
</svelte:head>

<slot />
