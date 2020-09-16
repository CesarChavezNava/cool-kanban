import { Action, createReducer, on } from '@ngrx/store';
import { Board } from '@shared/models/board';

import * as BoardsActions from '../actions/boards.actions';

export interface BoardsState {
  boards: Board[];
  loading: boolean;
  loadSuccess: boolean;
  loadFailed: boolean;
}

export const boardsInitialState: BoardsState = {
  boards: null,
  loading: false,
  loadSuccess: false,
  loadFailed: false,
};

const _boardsReducer = createReducer(
  boardsInitialState,
  on(BoardsActions.GetBoards, (state) => ({
    ...state,
    boards: null,
    loading: true,
    loadSuccess: false,
    loadFailed: false,
  })),
  on(BoardsActions.GetBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards,
    loading: false,
    loadSuccess: true,
    loadFailed: false,
  })),
  on(BoardsActions.GetBoardsFailed, (state) => ({
    ...state,
    boards: null,
    loading: false,
    loadSuccess: false,
    loadFailed: false,
  })),
  on(BoardsActions.ResetBoardsState, (state) => boardsInitialState)
);

export function boardsReducer(state: BoardsState, action: Action) {
  return _boardsReducer(state, action);
}
