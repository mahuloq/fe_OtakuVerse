import { CastAndCrew } from './castAndCrew';
import { Genre } from './genre';
import { Review } from './review';

export class Anime {
  id: number;
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
  cast_and_crews: CastAndCrew[];
  reviews: Review[];
  genre_ids?: number[];
  expanded?: boolean;

  constructor(anime: any) {
    this.id = anime.id || 0;
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
    this.cast_and_crews = anime.cast_and_crews;
    this.reviews = anime.reviews;
    this.cover_photo_url = anime.cover_photo_url;
  }
}
