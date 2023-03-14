import { baseURL } from '$lib/config.js';
import {
  SitemapStream,
  streamToPromise,
} from 'sitemap';

export async function GET({ params }) {
  const sitemap = new SitemapStream({ hostname: baseURL });
  sitemap.write({ url: `/`, lastmod: new Date().toISOString() });

  sitemap.end();

  const content = await streamToPromise(sitemap);

  return new Response(content.toString(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const prerender = true;
