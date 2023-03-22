import events from '$events';

export async function GET() {
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export const prerender = true;
