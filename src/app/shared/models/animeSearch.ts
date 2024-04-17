export class AnimeSearch {
  id: number;
  english_title: string;
  romanji_title: string;
  start_air_date: string;
  end_air_date: string;
  number_of_episodes: number;
  description: string;
  cover_photo_url: string;

  constructor(anime: any) {
    this.id = anime.id || 0;
    this.english_title = anime.english_title || '';
    this.romanji_title = anime.romanji_title || '';
    this.start_air_date = anime.start_air_date;
    this.end_air_date = anime.end_air_date || 0;
    this.number_of_episodes = anime.number_of_episodes || 0;
    this.description = anime.description;
    this.cover_photo_url = anime.cover_photo_url;
  }
}
