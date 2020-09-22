import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UnsplashImage } from '@shared/models/unsplash-image';
import { Observable, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  constructor(private http: HttpClient) {}

  getMany(query: string): Observable<any | UnsplashImage[]> {
    return this.http
      .get(
        `${environment.apiUnsplash}/search/photos/?client_id=${environment.id_client_unsplash}&query=${query}&per_page=12&orientation=landscape`,
        { headers: { skip: 'true' } }
      )
      .pipe(
        tap((data) => console.log('res', data)),
        map((data: any) => {
          console.log('data', data);
          const unsplashImages: UnsplashImage[] = [];

          data.results.forEach((result) => {
            const unsplashImage: UnsplashImage = {} as UnsplashImage;
            unsplashImage.id = result.id;
            unsplashImage.urlImage = result.urls.full;
            unsplashImage.urlThumb = result.urls.thumb;

            unsplashImages.push(unsplashImage);
          });

          return unsplashImages;
        }),
        catchError((error) => throwError(error))
      );
  }
}
