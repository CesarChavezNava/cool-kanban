import { createAction, props } from '@ngrx/store';
import { Board } from '@shared/models/board';

export const GetBoards = createAction('[Board] Get boards by user');

export const GetBoardsSuccess = createAction(
  '[Board] Get boards by user successfully',
  props<{ boards: Board[] }>()
);

export const GetBoardsFailed = createAction(
  '[Board] Get boards by user failed'
);

export const ResetBoardsState = createAction('[Board] Rest board state');
