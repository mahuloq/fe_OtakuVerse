import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonSearchService {
  constructor(private http: HttpClient) {}

  searchByName(name: string): Observable<any> {
    if (name.trim() === '') {
      //Return an empty array if name is empty or only whitespace
      return of([]);
    } else {
      return this.http
        .get<any>(`${environment.apiUrl}/api/search`, {
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
