import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Genre } from '../../shared/models/genre';
import { Anime } from '../../shared/models/anime';

@Injectable({
  providedIn: 'root',
})
export class CreateAnimeService {
  constructor(private http: HttpClient) {}

  getAnimes(page: number) {
    return this.http.get<Anime[]>(`${environment.apiUrl}/animes?page=${page}`);
  }

  getAnime(id: string | number) {
    return this.http.get<Anime>(`${environment.apiUrl}/animes/${id}`);
  }

  createAnime(anime: Anime) {
    return this.http.post(`${environment.apiUrl}/animes`, anime);
  }
}
