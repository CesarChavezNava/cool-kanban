import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
      first()
    );
  }
}
