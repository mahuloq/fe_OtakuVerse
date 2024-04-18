import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../../shared/models/review';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  submitReview(review: Review) {
    return this.http.post(`${environment.apiUrl}/reviews`, review);
  }

  showReview(id: number) {
    return this.http.get<Review>(`${environment.apiUrl}/reviews/${id}`);
  }

  deleteReview(id: number) {
    return this.http.delete(`${environment.apiUrl}/reviews/${id}`);
  }

  updateReview(review: Review, id: number) {
    return this.http.put(`${environment.apiUrl}/reviews/${id}`, review);
  }
}
