import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['/', '/sitemap.xml', '/content.json']
		},
		alias: {
			$events: 'src/data/events.json'
		}
	}
};

export default config;
