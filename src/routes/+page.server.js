import events from '$events';

export async function load({ params }) {
  return {
    events,
  };
}

export const csr = false;
export const prerender = true;
