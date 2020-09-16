import { Injectable } from '@angular/core';
import { BoardService } from '@core/http/board.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as BoardsActions from '../actions/boards.actions';

@Injectable()
export class BoardsEffects {
  constructor(private action$: Actions, private boardService: BoardService) {}

  getBoards$ = createEffect(() =>
    this.action$.pipe(
      ofType(BoardsActions.GetBoards),
      mergeMap(() =>
        this.boardService.getAll().pipe(
          map((boards) => BoardsActions.GetBoardsSuccess({ boards })),
          catchError(() => of(BoardsActions.GetBoardsFailed()))
        )
      )
    )
  );
}
