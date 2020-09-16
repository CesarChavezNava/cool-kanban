import { Action, createReducer, on } from '@ngrx/store';
import { Board } from '@shared/models/board';

import * as BoardActions from '../actions/board.actions';

export interface BoardState {
  board: Board;
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export const boardInitialState: BoardState = {
  board: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

const _boardReducer = createReducer(
  boardInitialState,
  on(BoardActions.AddBoard, (state) => ({
    ...state,
    board: null,
    loading: true,
    success: false,
    failed: false,
    message: null,
  })),
  on(BoardActions.AddBoardSuccess, (state, { board }) => ({
    ...state,
    boards: board,
    loading: false,
    success: true,
    error: false,
    message: 'Bord has been added successfully',
  })),
  on(BoardActions.AddBoardFailed, (state, { message }) => ({
    ...state,
    board: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  on(BoardActions.ResetBoardState, (state) => boardInitialState)
);

export function boardReducer(state: BoardState, action: Action) {
  return _boardReducer(state, action);
}
