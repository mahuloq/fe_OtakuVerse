import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CastAndCrew } from '../../shared/models/castAndCrew';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  constructor(private http: HttpClient) {}

  createCast(castData: CastAndCrew) {
    return this.http.post<CastAndCrew>(
      `${environment.apiUrl}/cast_and_crews`,
      castData
    );
  }
}
