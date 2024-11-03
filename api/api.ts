import { getEvents, writeJSON } from './utils';

async function request() {
  const events = await getEvents();
  writeJSON(events, 'src/data/events.json');
}
request();
