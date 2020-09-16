import { createAction, props } from '@ngrx/store';
import { Board } from '@shared/models/board';

export const AddBoard = createAction(
  '[Board] Add new board',
  props<{ board: Board }>()
);

export const AddBoardSuccess = createAction(
  '[Board] Add new board successfully',
  props<{ board: Board }>()
);

export const AddBoardFailed = createAction(
  '[Board] Add new board failed',
  props<{ message: string }>()
);

export const ResetBoardState = createAction('[Board] Rest board state');
