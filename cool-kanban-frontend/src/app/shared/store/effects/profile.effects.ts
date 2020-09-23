import { Injectable } from '@angular/core';
import { ProfileService } from '@core/http/profile.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as ProfileActions from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private profileService: ProfileService
  ) {}

  GetProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.GetProfile),
      mergeMap(() =>
        this.profileService.get().pipe(
          map((profile) => ProfileActions.GetProfileSuccess({ profile })),
          catchError((error) => of(ProfileActions.GetProfileFailed(error)))
        )
      )
    )
  );

  UpdateProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.UpdateProfile),
      switchMap((action) =>
        this.profileService.update(action.profile).pipe(
          tap((profile) => console.log('tap', profile)),
          map((profile) => ProfileActions.UpdateProfileSuccess({ profile })),
          catchError((error) => of(ProfileActions.UpdateProfileFailed(error)))
        )
      )
    )
  );
}
