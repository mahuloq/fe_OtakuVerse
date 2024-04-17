import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Genre } from '../../shared/models/genre';
import { Observable, catchError, of } from 'rxjs';
import { Anime } from '../../shared/models/anime';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getGenres() {
    return this.http.get<Genre[]>(`${environment.apiUrl}/genres`);
  }

  getGenre(id: string | number) {
    return this.http.get<Genre>(`${environment.apiUrl}/genres/${id}`);
  }

  createGenre(genre: Genre) {
    return this.http.post(`${environment.apiUrl}/genres`, genre);
  }

  getGenresWithAnimeCount(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.apiUrl}/genres/anime_count`);
  }

  searchByName(name: string): Observable<any> {
    if (name.trim() === '') {
      //Return an empty array if name is empty or only whitespace
      return of([]);
    } else {
      return this.http
        .get<any>(`${environment.apiUrl}/api/searchGenre`, {
          params: { name },
        })
        .pipe(
          catchError((error) => {
            console.error('Error occured while searching:', error);
            return of([]);
          })
        );
    }
  }

  filterGenreByName(id: number) {
    return this.http.get<Anime[]>(
      `${environment.apiUrl}/api/searchAnimeByGenreId/${id}`
    );
  }
}
