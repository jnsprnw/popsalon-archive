import events from '$events';
import { baseURL } from '$lib/config.js';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
  const sitemap = new SitemapStream({ hostname: baseURL });
  sitemap.write({ url: `/`, lastmod: new Date().toISOString() });

  for (const event of events) {
    if (typeof event.number === 'number') {
      sitemap.write({
        url: `/event/${event.number}`,
        lastmod: event.date.iso,
      });
    }
    sitemap.write({
      url: `/event/${event.date.iso.split('T')[0]}`,
      lastmod: event.date.iso,
    });
  }

  sitemap.end();

  const content = await streamToPromise(sitemap);

  return new Response(content.toString(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const prerender = true;
