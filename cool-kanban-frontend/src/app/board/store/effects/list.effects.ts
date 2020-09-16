import { Injectable } from '@angular/core';
import { ListService } from '@core/http/list.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ListActions from '../actions/list.actions';

@Injectable()
export class ListEffects {
  constructor(private action$: Actions, private listService: ListService) {}

  UpdateBoard$ = createEffect(() =>
    this.action$.pipe(
      ofType(ListActions.UpdateList),
      switchMap((action) =>
        this.listService.save(action.list).pipe(
          map((list) => ListActions.UpdateListSuccess({ list })),
          catchError((error) => of(ListActions.UpdateListFailed(error)))
        )
      )
    )
  );
}
