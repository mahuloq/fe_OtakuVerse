import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Genre } from '../../shared/models/genre';
import { Anime } from '../../shared/models/anime';

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
}
