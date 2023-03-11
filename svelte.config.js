import path from 'path';

import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $events: path.resolve('./src/data/events.json'),
    },
  },
  vite: {
    define: {
      global: {},
    },
  },
};

export default config;
