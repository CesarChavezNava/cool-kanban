import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(urlSegment: string): Observable<T> {
    return this.http
      .get<T>(`${environment.api}/${urlSegment}`)
      .pipe(catchError((error) => throwError(error)));
  }

  getAll<T>(urlSegment: string): Observable<T[]> {
    console.log(`${environment.api}/${urlSegment}`);
    return this.http
      .get<T[]>(`${environment.api}/${urlSegment}`)
      .pipe(catchError((error) => throwError(error)));
  }

  post<T>(urlSegment: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${environment.api}/${urlSegment}`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError((error) => throwError(error)));
  }

  put<T>(urlSegment: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${environment.api}/${urlSegment}`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError((error) => throwError(error)));
  }

  delete(urlSegment: string): Observable<void | object> {
    return this.http
      .delete(`${environment.api}/${urlSegment}`)
      .pipe(catchError((error) => throwError(error)));
  }
}
