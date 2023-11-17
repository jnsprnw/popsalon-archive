import * as dotenv
  from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fetch from 'node-fetch';

dotenv.config();

const DATABASE_EVENTS = process.env.VITE_NOTION_DATABASE_EVENTS;
const DATABASE_VIDEOS = process.env.VITE_NOTION_DATABASE_VIDEOS;
const bearer = process.env.VITE_NOTION_SECRET;

async function fetchContent(id, start_cursor) {
  const result = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + bearer,
      'Notion-Version': '2021-08-16',
    },
    body: JSON.stringify({
      page_size: 100,
      start_cursor
    }),
  });

  return await result.json();
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}).format;

const dateFormatterLong = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format;

export async function getEvents() {
  let hasMore = false;
  let start_cursor = undefined;
  const events = [];
  do {
    const response = await fetchContent(DATABASE_EVENTS, start_cursor);
    const arr = await formatEvents(response.results);
    events.push(...arr);
    hasMore = response.has_more;
    start_cursor = response.results.at(-1).id;
  } while (hasMore)
  return events;
}

async function getVideos() {
  let hasMore = false;
  let start_cursor = undefined;
  const videos = [];
  do {
    const response = await fetchContent(DATABASE_VIDEOS, start_cursor);
    const arr = await formatVideos(response.results);
    videos.push(...arr);
    hasMore = response.has_more;
    start_cursor = response.results.at(-1).id;
  } while (hasMore)
  return Object.fromEntries(videos);
}

export async function formatEvents(arr) {
  console.log(`Events: ${arr.length}`);
  const videos = await getVideos();
  console.log(`Videos: ${Object.keys(videos).length}`);

  let events = [];
  for (let i = 0; i < arr.length; i++) {
    const post = arr[i];
    const id = post.id;
    const props = post.properties;
    const name = props['Name'].title.map(({ plain_text }) => plain_text).join('');
    const number = props.Number.number;
    const date = new Date(new Date(props.Datum.date.start).setHours(22));
    const url = props.URL.url;
    const guests = props['Gäste'].multi_select.map(({ name }) => name);
    const content = props['Videos'].relation.map(({ id }) => videos[id]).filter(Boolean);

    const item = {
      id,
      title: name === String(number) ? null : name,
      number,
      date: {
        date,
        iso: date.toISOString(),
        short: dateFormatter(date),
        long: dateFormatterLong(date),
      },
      url,
      guests,
      videos: content,
    };

    if (date) {
      events.push(item);
    }
  }

  events = events.sort((a, b) => b.date.date - a.date.date);

  return events;
}

export async function formatVideos(arr) {
  let videos = [];

  for (let i = 0; i < arr.length; i++) {
    const video = arr[i];
    const id = video.id;
    const props = video.properties;
    const artist = props['Künstler'].title.map(({ plain_text }) => plain_text).join('');
    const title = props['Name'].rich_text.map(({ plain_text }) => plain_text).join('');
    const year = props.Jahr.number;
    const rip = props.Todesfall.checkbox;
    const played = !props['Nicht gespielt'].checkbox;
    const person = props['Person'].multi_select.map(({ name }) => name);

    const item = {
      id,
      artist,
      title,
      year,
      rip,
      played,
      person,
    };

    videos.push([id, item]);
  }

  return videos;
}
