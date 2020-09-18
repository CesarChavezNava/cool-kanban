import { Injectable } from '@angular/core';
import { ListService } from '@core/http/list.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ListActions from '../actions/list.actions';

@Injectable()
export class ListEffects {
  constructor(private action$: Actions, private listService: ListService) {}

  CreateList$ = createEffect(() =>
    this.action$.pipe(
      ofType(ListActions.CreateList),
      switchMap((action) =>
        this.listService.save(action.list).pipe(
          map((list) => ListActions.CreateListSuccess({ list })),
          catchError((error) => of(ListActions.CreateListFailed(error)))
        )
      )
    )
  );

  UpdateList$ = createEffect(() =>
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

  RemoveList$ = createEffect(() =>
    this.action$.pipe(
      ofType(ListActions.RemoveList),
      switchMap((action) =>
        this.listService.delete(action.idBoard, action.id).pipe(
          map(() => ListActions.RemoveListSuccess()),
          catchError((error) => of(ListActions.RemoveListFailed(error)))
        )
      )
    )
  );
}
