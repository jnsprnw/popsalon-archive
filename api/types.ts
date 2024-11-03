export interface DateInfo {
  date: string; // ISO 8601 Date string
  iso: string; // ISO 8601 Date string
  short: string; // Short date format
  long: string; // Long date format
  day: string; // Day of the week
}

export interface Event {
  id: string; // UUID
  title: string; // Title of the event
  number: number; // Event number
  date: DateInfo; // Date information
  url: string; // URL to the event
  guests: string[]; // List of guests
  videos: any[]; // List of videos (assuming any type for now)
}
