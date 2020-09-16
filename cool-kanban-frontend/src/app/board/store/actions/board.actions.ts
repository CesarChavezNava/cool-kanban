import { createAction, props } from '@ngrx/store';
import { Board } from '@shared/models/board';

export const GetBoard = createAction(
  '[Board] Get board',
  props<{ id: string }>()
);

export const GetBoardSuccess = createAction(
  '[Board] Get board successfully',
  props<{ board: Board }>()
);

export const GetBoardFailed = createAction(
  '[Board] Get board failed',
  props<{ message: string }>()
);

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

export const RemoveBoard = createAction(
  '[Board] Remove board',
  props<{ id: string }>()
);

export const RemoveBoardSuccess = createAction(
  '[Board] Remove board successfully'
);

export const RemoveBoardFailed = createAction(
  '[Board] Remove board failed',
  props<{ message: string }>()
);

export const ResetBoardState = createAction('[Board] Rest board state');
