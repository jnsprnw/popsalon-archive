<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { baseURL, description, title } from '$lib/config.js';
	import { dateFormatter } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	const updated_time = new Date();

	const canonical = $derived(page?.data?.canonical ? `/${page?.data?.canonical}` : baseURL);
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

	<link rel="canonical" href={canonical} />
	{#if page?.data.nextEvent}
		<link rel="next" href={`/${page?.data.nextEvent}`} />
	{/if}
	{#if page?.data.previousEvent}
		<link rel="prev" href={`/${page?.data.previousEvent}`} />
	{/if}
	{#if page?.data.alternate}
		<link rel="alternate" href={`/${page?.data.alternate}`} />
	{/if}
</svelte:head>

<div class="mx-auto max-w-3xl px-3 pt-20">
	<header class="md:px-6">
		<h1 class="text-2xl font-semibold">Popsalon Archiv</h1>
		<h2 class="text-lg">Tobi Müller und Jens Balzer im Deutschen Theater, Berlin</h2>
		<h3 class="text-sm">Unvollständig und inoffiziell</h3>
	</header>

	{@render children?.()}

	<footer class="my-16 px-6">
		<span>
			Zuletzt aktualisiert {dateFormatter(new Date())} von
			<a
				class="hover:text-accent underline decoration-violet-300 hover:decoration-violet-300"
				href="https://jonasparnow.com"
			>
				Jonas Parnow
			</a>
		</span>
	</footer>
</div>
