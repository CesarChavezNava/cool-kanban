import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@core/services/auth.service';

import * as signInActions from '../actions/sign-in.actions';

@Injectable()
export class SignInEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInActions.SignIn),
      exhaustMap((action) =>
        this.authService.signIn(action.email, action.password).pipe(
          map(() => signInActions.SignInSuccess()),
          catchError((error) =>
            of(signInActions.SignInFailed({ message: error }))
          )
        )
      )
    )
  );
}
