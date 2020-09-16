import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@core/services/auth.service';

import * as signUpActions from '../actions/sign-up.actions';

@Injectable()
export class SignUpEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.SignUp),
      exhaustMap((action) =>
        this.authService.signUp(action.email, action.password).pipe(
          map(() => signUpActions.SignUpSuccess()),
          catchError((error) =>
            of(signUpActions.SignUpFailed({ message: error }))
          )
        )
      )
    )
  );
}
