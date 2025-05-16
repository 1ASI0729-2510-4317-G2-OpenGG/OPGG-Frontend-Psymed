import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MoodService {
  private apiUrl = 'http://localhost:3000/moods';

  constructor(private http: HttpClient) {}

  saveMood(moodData: any): Observable<any> {
    return this.http.post(this.apiUrl, moodData);
  }

  getMoods(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  deleteAll(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      switchMap(items => {
        const deleteRequests = items.map(item => this.http.delete(`${this.apiUrl}/${item.id}`));
        return forkJoin(deleteRequests);
      })
    );
  }

}
