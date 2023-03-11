// import { Feed } from 'feed';
// import data from '$posts';

// export function getPosts({ page, lang, favorites }) {
//   // console.log({ lang, favorites });
//   let posts = data;
//   return posts;
// }

// export function getPost(slug) {
//   // console.log({ slug });
//   const post = data.find(({ id }) => id === slug);
//   // console.log(post);
//   return post;
// }

// export function formatResponse(json) {
//   return new Response(JSON.stringify(json), {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }

// export async function fetchPosts({ lang, favorites }) {
//   const filters = [];
//   if (Boolean(favorites)) {
//     filters.push({
//       property: 'Favourite',
//       checkbox: {
//         equals: true,
//       },
//     });
//   }
//   if (lang === 'de') {
//     filters.push({
//       property: 'Language',
//       select: {
//         equals: 'German',
//       },
//     });
//   } else if (lang === 'en') {
//     filters.push({
//       property: 'Language',
//       select: {
//         does_not_equal: 'German',
//       },
//     });
//   }
//   const params = {
//     page_size: 100,
//   };

//   if (filters.length > 1) {
//     params['filter'] = {
//       and: filters,
//     };
//   } else if (filters.length === 1) {
//     params['filter'] = filters[0];
//   }
//   // console.log({ params, filters });
//   console.log('fetch');
//   const result = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + bearer,
//       'Notion-Version': '2021-08-16',
//     },
//     body: JSON.stringify(params), // body data type must match "Content-Type" header
//   });

//   return await result.json();
// }

export const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}).format;

// const dateFormatterLong = new Intl.DateTimeFormat('en', {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// });

// export function formatDate(date, isLong = false) {
//   if (isLong) {
//     return dateFormatterLong.format(new Date(date));
//   }
//   return dateFormatter.format(new Date(date));
// }

// export function findRelations(arr, posts) {
//   const relations = arr.map((id) => posts.find(({ notionID }) => notionID === id)).filter(Boolean);
//   return relations.map(({ id, title, language }) => ({ id, title, language }));
// }

// export function findRelatedPosts(post, posts) {
//   const list = [];
//   post.authors.forEach((author) => {
//     const findings = posts.filter(
//       (p) => p.authors.find((a) => a.id === author.id) && post.notionID !== p.notionID
//     );
//     if (findings.length) {
//       list.push(...findings);
//     }
//   });
//   return list.map(({ id, title }) => ({ id, title }));
// }

// export function formatPosts(arr) {
//   let posts = arr
//     .map((post) => {
//       const props = post.properties;
//       const title = props.Name.title.map(({ text }) => text.content).join(' ');
//       return {
//         title,
//         id: kebabCase(title),
//         notionID: post.id,
//         created_at: {
//           label: formatDate(post.created_time),
//           string: post.created_time,
//         },
//         edited_at: {
//           label: formatDate(post.last_edited_time),
//           string: post.last_edited_time,
//         },
//         url: props.URL.url,
//         description: props.Description.rich_text[0]?.text?.content,
//         image: props.Image?.url,
//         date: {
//           label: formatDate(props.Date?.date?.start || null),
//           string: props.Date?.date?.start,
//         },
//         language: {
//           label: props.Language.select?.name,
//           id: props.Language.select?.id,
//         },
//         format: props.Format.select?.name,
//         favourite: props.Favourite.checkbox,
//         via: props.Via.select?.name,
//         viaLink: props.ViaLink?.url,
//         tags: props.Tags.multi_select.map((tag) => ({ label: tag.name, id: tag.id })),
//         authors: props.Author.multi_select.map((author) => ({
//           label: author.name,
//           id: author.id,
//         })),
//         publisher: props.Publisher.select?.name,
//         relations: props['Related Klimablog']?.relation.map(({ id }) => id),
//         hide: props.Hide.checkbox,
//         schema: props.Schema.select?.name || 'CreativeWork',
//       };
//     })
//     .filter(
//       ({ hide, publisher, format, title, description }) =>
//         !hide && publisher && format && title && description
//     );

//   posts = posts.map((post) => {
//     const obj = {
//       ...post,
//       relations: findRelations(post.relations, posts),
//       related: findRelatedPosts(post, posts),
//     };
//     return obj;
//   });

//   return posts;
// }

// export function generateFeed(posts, params) {
//   const url = [params.lang, params.favorites].filter(Boolean);

//   const feed = new Feed({
//     title,
//     description,
//     id: baseURL,
//     link: baseURL,
//     language: params.lang === 'de' ? 'de' : 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
//     image: baseURL + 'android-chrome-512x512.png',
//     favicon: baseURL + 'android-chrome-192x192.png',
//     copyright: `${new Date().getFullYear()} ${author}`,
//     // updated: new Date(2013, 6, 14), // optional, default = today
//     generator: 'Sveltekit', // optional, default = 'Feed for Node.js'
//     feedLinks: {
//       json: baseURL + url.join('/') + (url.length ? '/' : '') + 'feed.json',
//       atom: baseURL + url.join('/') + (url.length ? '/' : '') + 'atom.xml',
//       rss: baseURL + url.join('/') + (url.length ? '/' : '') + 'rss.xml',
//     },
//     author: {
//       name: author,
//       // email: 'johndoe@example.com',
//       link: baseURL,
//     },
//   });

//   // feed.addCategory('Technologie');

//   for (const post of posts) {
//     feed.addItem({
//       title: post.title,
//       id: post.slug,
//       link: post.url,
//       description: post.description,
//       // content: post.content,
//       // contributor: [
//       //   {
//       //     name: "Shawn Kemp",
//       //     email: "shawnkemp@example.com",
//       //     link: "https://example.com/shawnkemp"
//       //   },
//       //   {
//       //     name: "Reggie Miller",
//       //     email: "reggiemiller@example.com",
//       //     link: "https://example.com/reggiemiller"
//       //   }
//       // ],
//       date: new Date(post.created_at.string),
//       categories: [post.format],
//       // image: post.image
//     });
//   }
//   return feed;
// }
