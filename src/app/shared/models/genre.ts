export class Genre {
  id: number;
  name: string;
  anime_count?: number;
  description?: string;

  constructor(genreData: any) {
    this.id = genreData.id || 0;
    this.name = genreData.name || '';
    this.anime_count = genreData.anime_count || 0;
    this.description = genreData.description || '';
  }
}
