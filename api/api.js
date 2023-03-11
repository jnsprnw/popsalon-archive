import { writeFile } from 'fs';

import { getEvents } from './utils.js';

async function request() {
  const events = await getEvents();
  const path = 'src/data/events.json';
  writeFile(path, JSON.stringify(events, false, 2), (err) => {
    if (err) console.log(err);
    else {
      console.log(`${path} written.`);
    }
  });
}
request();
