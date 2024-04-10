import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Profile } from '../../shared/models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(username: string) {
    return this.http.get<Profile>(`${environment.apiUrl}/profiles/${username}`);
  }

  removeAnimeFromList(anime: any) {
    console.log('Service Delete');
    return this.http.delete(`${environment.apiUrl}/anime_lists/${anime.id}`);
  }
}
