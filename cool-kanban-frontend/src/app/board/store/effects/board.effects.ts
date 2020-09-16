import { Injectable } from '@angular/core';
import { BoardService } from '@core/http/board.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as BoardActions from '../actions/board.actions';

@Injectable()
export class BoardEffects {
  constructor(private action$: Actions, private boardService: BoardService) {}

  GetBoard$ = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.GetBoard),
      mergeMap((action) =>
        this.boardService.get(action.id).pipe(
          map((board) => BoardActions.GetBoardSuccess({ board })),
          catchError((error) => of(BoardActions.GetBoardFailed(error)))
        )
      )
    )
  );

  AddBoard$ = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.AddBoard),
      switchMap((action) =>
        this.boardService.save(action.board).pipe(
          map((board) => BoardActions.AddBoardSuccess({ board })),
          catchError((error) => of(BoardActions.AddBoardFailed(error)))
        )
      )
    )
  );

  RemoveBoard$ = createEffect(() =>
    this.action$.pipe(
      ofType(BoardActions.RemoveBoard),
      switchMap((action) =>
        this.boardService.delete(action.id).pipe(
          map(() => BoardActions.RemoveBoardSuccess()),
          catchError((error) => of(BoardActions.RemoveBoardFailed(error)))
        )
      )
    )
  );
}
