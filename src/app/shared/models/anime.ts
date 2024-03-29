import { Genre } from './genre';

export class Anime {
  english_title: string;
  romanji_title: string;
  start_air_date: string;
  end_air_date: string;
  number_of_episodes: number;
  description: string;
  season: string;
  studio: string;
  source: string;
  duration: number;
  age_rating: string;
  cover_photo_url: string;
  genres: Genre[];

  constructor(anime: any) {
    this.english_title = anime.english_title || '';
    this.romanji_title = anime.romanji_title || '';
    this.start_air_date = anime.start_air_date;
    this.end_air_date = anime.end_air_date || 0;
    this.number_of_episodes = anime.number_of_episodes || 0;
    this.description = anime.description;
    this.age_rating = anime.age_rating;
    this.season = anime.season;
    this.studio = anime.studio || '';
    this.source = anime.source || '';
    this.duration = anime.duration || 0;
    this.genres = anime.genres;
    this.cover_photo_url = anime.cover_photo_url;
  }
}
