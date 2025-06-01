import events from '$events';
import { error } from '@sveltejs/kit';

/**
 * Findet einen Event basierend auf der Nummer oder dem Datum im ISO-Format
 * @param slug Die Event-Nummer oder das Datum im Format YYYY-MM-DD
 * @returns Das Event-Objekt oder undefined wenn nicht gefunden
 */
function getPostByEvent(slug: string) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateRegex.test(slug)) {
    // Datumsformat YYYY-MM-DD wurde gefunden
    const index = events.findIndex((event) => {
      // Beginnt die ISO-Datumszeichenfolge mit dem angegebenen Datum?
      return event.date.iso.startsWith(slug);
    });
    return {
      event: events[index],
      index: index,
      alternate: events[index].number,
    };
  }

  // Versuche, ob slug eine Nummer ist
  const eventNumber = Number.parseInt(slug, 10);

  if (!Number.isNaN(eventNumber)) {
    // Suche nach Events mit der Nummer eventNumber
    const index = events.findIndex((event) => event.number === eventNumber);
    return {
      event: events[index],
      index: index,
      alternate: events[index].date.iso.slice(0, 10),
    };
  }

  return undefined;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { event: eventSlug } = params;
  const { event, index, alternate } = getPostByEvent(eventSlug);
  if (!event) {
    error(404, {
      message: 'Not found',
    });
  }

  const nextEvent = index > 0 ? events[index - 1] : null;
  const previousEvent = index < events.length - 1 ? events[index + 1] : null;

  return {
    event,
    previousEvent: previousEvent ? previousEvent.date.iso.slice(0, 10) : null,
    nextEvent: nextEvent ? nextEvent.date.iso.slice(0, 10) : null,
    alternate,
    canonical: events[index].date.iso.slice(0, 10),
  };
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  // Generiere URLs für alle Events basierend auf der Event-Nummer und dem Datum
  return events
    .map((event) => ({
      event: event.number.toString(),
    }))
    .concat(
      events.map((event) => {
        // Extrahiere YYYY-MM-DD aus dem ISO-Datum
        const isoDate = event.date.iso.split('T')[0];
        return { event: isoDate };
      })
    );
}

export const prerender = true;
