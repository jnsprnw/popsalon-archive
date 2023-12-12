import events from '$events';

export async function load() {
  return {
    events,
  };
}

// export const csr = false;
export const prerender = true;
