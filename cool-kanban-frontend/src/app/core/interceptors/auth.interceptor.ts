import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      mergeMap((token: string) => {
        if (token) {
          request = request.clone({ setHeaders: { Authorization: token } });
        }

        return next.handle(request);
      }),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
