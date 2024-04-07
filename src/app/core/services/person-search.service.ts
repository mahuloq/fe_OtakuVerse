import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonSearchService {
  constructor(private http: HttpClient) {}

  searchByName(name: string): Observable<any> {
    return this.http.get<any>(`/api/search?name=${name}`);
  }
}
