import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Genre } from '../../shared/models/genre';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getGenres(page: number) {
    return this.http.get<Genre[]>(`${environment.apiUrl}/genres`);
  }

  getGenre(id: string | number) {
    return this.http.get<Genre>(`${environment.apiUrl}/genres/${id}`);
  }

  createGenre(genre: Genre) {
    return this.http.post(`${environment.apiUrl}/genres`, genre);
  }
}
