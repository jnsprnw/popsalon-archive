import events from '$events';

export async function GET() {
  return new Response(JSON.stringify(events), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const prerender = true;
