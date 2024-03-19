export class Genre {
  id: number;
  name: string;

  constructor(genreData: any) {
    this.id = genreData.id || 0;
    this.name = genreData.name || '';
  }
}
