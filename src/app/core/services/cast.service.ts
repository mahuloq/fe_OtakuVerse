import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateCast } from '../../shared/models/createCast';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  constructor(private http: HttpClient) {}

  createCast(castData: CreateCast) {
    return this.http.post<CreateCast>(
      `${environment.apiUrl}/cast_and_crew`,
      castData
    );
  }

  updateCast(castData: CreateCast) {
    return this.http.put<CreateCast>(
      `${environment.apiUrl}/cast_and_crew/${castData.id}`,
      castData
    );
  }

  getFullCrew(animeId: number) {
    const params = new HttpParams().set('anime_id', animeId.toString());
    return this.http.get<any>(`${environment.apiUrl}/cast_and_crew/fullCrew`, {
      params,
    });
  }
}
