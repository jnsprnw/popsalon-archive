import { error } from '@sveltejs/kit';
// import { getPostBySlug, getAllSlugs, hasImage } from '$utils/posts';
import events from '$events';

/**
 * Findet einen Event basierend auf der Nummer oder dem Datum im ISO-Format
 * @param slug Die Event-Nummer oder das Datum im Format YYYY-MM-DD 
 * @returns Das Event-Objekt oder undefined wenn nicht gefunden
 */
function getPostByEvent(slug: string) {
  // Versuche, ob slug eine Nummer ist
  const eventNumber = parseInt(slug, 10);
  
  if (!isNaN(eventNumber)) {
    // Suche nach Events mit der Nummer eventNumber
    return events.find(event => event.number === eventNumber);
  } else {
    // Ansonsten prüfen, ob der slug ein Datum im Format YYYY-MM-DD ist
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (dateRegex.test(slug)) {
      // Datumsformat YYYY-MM-DD wurde gefunden
      return events.find(event => {
        // Beginnt die ISO-Datumszeichenfolge mit dem angegebenen Datum?
        return event.date.iso.startsWith(slug);
      });
    }
  }
  
  return undefined;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { event } = params;
  const post = getPostByEvent(event);

  if (!post) {
    error(404, {
      message: 'Not found',
    });
  }

  return {
    post,
  };
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  // Generiere URLs für alle Events basierend auf der Event-Nummer und dem Datum
  return events.map(event => ({
    event: event.number.toString()
  })).concat(
    events.map(event => {
      // Extrahiere YYYY-MM-DD aus dem ISO-Datum
      const isoDate = event.date.iso.split('T')[0];
      return { event: isoDate };
    })
  );
}

export const prerender = true;
