import { User } from './user';

export class Review {
  recommend: string;
  content: string;
  user: User;
  id?: number;
  anime_id?: number;

  constructor(reviewData: any) {
    this.id = reviewData.id || 0;
    this.recommend = reviewData.recommend || '';
    this.content = reviewData.content || '';
    this.user = new User(reviewData.user || {});
    this.anime_id = reviewData.anime_id;
  }
}
