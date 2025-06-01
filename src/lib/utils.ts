export const dateFormatter = new Intl.DateTimeFormat('de-DE', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric'
}).format;

export const listFormatter = new Intl.ListFormat('de', { style: 'long', type: 'conjunction' })
	.format;
