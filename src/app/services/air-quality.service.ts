import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {

  constructor(private http: HttpClient) { }

  loading$ = new BehaviorSubject<boolean>(false);
  apiUrl = 'http://localhost:8000/aq/';

  fetchData(field: string, startDate: string, endDate: string) {
    this.loading$.next(true);
    return this.http.get<any[]>(
      `${this.apiUrl}${field}?start_date=${startDate}&end_date=${endDate}`
    ).pipe(
      map((data) => {
        return data.map((row) => [row['Date'], row['Col']]);
      }),
      tap(() => this.loading$.next(false)),
    )


  }
}
