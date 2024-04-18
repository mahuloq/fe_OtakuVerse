import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AnimeLists } from '../../shared/models/animeLists';

@Injectable({
  providedIn: 'root',
})
export class AnimeListService {
  constructor(private http: HttpClient) {}

  createAnimeList(animeList: AnimeLists) {
    return this.http.post(`${environment.apiUrl}/anime_lists`, animeList);
  }

  updateAnimeList(animeList: AnimeLists, id: number) {
    return this.http.put(`${environment.apiUrl}/anime_lists/${id}`, animeList);
  }

  getUserAnimeList(animeId: number) {
    return this.http.get<AnimeLists>(
      `${environment.apiUrl}/anime_lists/${animeId}`
    );
  }
}
