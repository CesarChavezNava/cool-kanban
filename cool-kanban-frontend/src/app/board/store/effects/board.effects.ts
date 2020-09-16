import { Injectable } from '@angular/core';
import { BoardService } from '@core/http/board.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as BoardActions from '../actions/board.actions';

@Injectable()
export class BoardEffects {
  constructor(private action$: Actions, private boardService: BoardService) {}

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
}
