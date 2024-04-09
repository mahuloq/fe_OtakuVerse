import { HttpClient } from '@angular/common/http';
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
}
