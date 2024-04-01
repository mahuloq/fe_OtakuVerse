import { User } from './user';

export class Review {
  id: number;
  recommend: string;
  content: string;
  user: User;

  constructor(reviewData: any) {
    this.id = reviewData.id || 0;
    this.recommend = reviewData.recommend || '';
    this.content = reviewData.content || '';
    this.user = new User(reviewData.user || {});
  }
}
