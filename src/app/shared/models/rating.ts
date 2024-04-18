export class Rating {
  id: number;
  score: number;

  constructor(rating: any) {
    this.id = rating.id;
    this.score = rating.score;
  }
}
