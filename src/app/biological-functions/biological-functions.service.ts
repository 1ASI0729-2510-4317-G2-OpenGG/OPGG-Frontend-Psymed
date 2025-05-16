import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiologicalFunctionsService {
  private apiUrl = 'http://localhost:3000/biologicalFunctions';  // Debe coincidir con la ruta en db.json

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
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
