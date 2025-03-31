import { POCKETBASE_URL, POCKETBASE_USER, POCKETBASE_PW } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { createEvents } from 'ics';
import PocketBase from 'pocketbase';

export const GET: RequestHandler = async () => {
  try {
    const pb = new PocketBase(POCKETBASE_URL);

    await pb.collection('_superusers').authWithPassword(POCKETBASE_USER, POCKETBASE_PW);

    const records = await pb.collection('events').getFullList({
      sort: '-date',
    });

    const icsEvents = records.map((record: any) => {
      const [date, time] = new Date(record.date).toISOString().split('T');
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');
      return {
        title: 'Popsalon',
        uid: `${year}-${month}-${day}`,
        start: [year, month, day, hour, minute].map(Number),
        duration: { hours: 2 },
        description: record.label,
        url: record.website,
        location: 'Deutsches Theater (Bar), Schumannstraße 13a, 10117 Berlin, Deutschland',
        geo: { lat: 52.52428, lon: 13.38193 },
      };
    });

    const { error: icsError, value: icsContent } = createEvents(icsEvents);

    if (icsError) {
      throw error(500, `Error generating iCal: ${icsError.message}`);
    }

    return new Response(icsContent, {
      headers: {
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename="events.ics"',
      },
    });
  } catch (err: any) {
    console.error('Error fetching or processing events:', err);
    throw error(500, 'Failed to generate iCal calendar');
  }
};
