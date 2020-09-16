import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@core/services/auth.service';

import * as ForgotPasswordActions from '../actions/forgot-password.actions';

@Injectable()
export class ForgotPasswordEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ForgotPasswordActions.SendPasswordResetEmail),
      exhaustMap((action) =>
        this.authService.sendPasswordResetEmail(action.email).pipe(
          map(() => ForgotPasswordActions.SendPasswordResetEmailSuccess()),
          catchError((error) =>
            of(
              ForgotPasswordActions.SendPasswordResetEmailFailed({
                message: error,
              })
            )
          )
        )
      )
    )
  );
}
