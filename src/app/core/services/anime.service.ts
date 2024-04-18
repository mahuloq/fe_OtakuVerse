import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Genre } from '../../shared/models/genre';
import { Anime } from '../../shared/models/anime';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}

  // This is for when I add a page serializer
  // getAnimes(page: number) {
  //   return this.http.get<Anime[]>(`${environment.apiUrl}/animes?page=${page}`);
  // }

  getAnimes() {
    return this.http.get<Anime[]>(`${environment.apiUrl}/animes`);
  }

  getAnime(id: string | number) {
    return this.http.get<Anime>(`${environment.apiUrl}/animes/${id}`);
  }

  createAnime(anime: Anime) {
    return this.http.post(`${environment.apiUrl}/animes`, anime);
  }

  updateAnime(anime: Anime, id: number) {
    return this.http.put(`${environment.apiUrl}/animes/${id}`, anime);
  }

  deleteAnime(id: number) {
    return this.http.delete(`${environment.apiUrl}/animes/${id}`);
  }

  filterAnimeByFirstLetter(letter: string) {
    return this.http.get<Anime[]>(
      `${environment.apiUrl}/api/searchAnimeLetter/${letter}`
    );
  }

  filterAnimeBySeason(season: string) {
    return this.http.get<Anime[]>(
      `${environment.apiUrl}/api/searchAnimeBySeason/${season}`
    );
  }

  searchByName(name: string): Observable<any> {
    if (name.trim() === '') {
      //Return an empty array if name is empty or only whitespace
      return of([]);
    } else {
      return this.http
        .get<any>(`${environment.apiUrl}/api/searchAnimeByName`, {
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
}
