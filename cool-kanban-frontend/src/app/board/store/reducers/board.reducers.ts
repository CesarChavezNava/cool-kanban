import { Action, createReducer, on } from '@ngrx/store';
import { Board } from '@shared/models/board';

import * as BoardActions from '../actions/board.actions';

export interface BoardState {
  id: string;
  board: Board;
  loading: boolean;
  loadSuccess: boolean;
  success: boolean;
  loadFailed: boolean;
  error: boolean;
  message: string;
}

export const boardInitialState: BoardState = {
  id: null,
  board: null,
  loading: false,
  loadSuccess: false,
  success: false,
  loadFailed: false,
  error: false,
  message: null,
};

const _boardReducer = createReducer(
  boardInitialState,
  // GET
  on(BoardActions.GetBoard, (state, { id }) => ({
    ...state,
    id: id,
    board: null,
    loading: true,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(BoardActions.GetBoardSuccess, (state, { board }) => ({
    ...state,
    id: null,
    board: board,
    loading: false,
    loadSuccess: true,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(BoardActions.GetBoardFailed, (state, { message }) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: true,
    error: false,
    message: message,
  })),
  // ADD
  on(BoardActions.AddBoard, (state) => ({
    ...state,
    id: null,
    board: null,
    loading: true,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(BoardActions.AddBoardSuccess, (state, { board }) => ({
    ...state,
    id: null,
    board: board,
    loading: false,
    loadSuccess: false,
    success: true,
    loadFailed: false,
    error: false,
    message: 'Bord has been added successfully',
  })),
  on(BoardActions.AddBoardFailed, (state, { message }) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: true,
    message: message,
  })),
  // UPDATE
  on(BoardActions.UpdateBoard, (state) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(BoardActions.UpdateBoardSuccess, (state, { board }) => ({
    ...state,
    id: null,
    board: board,
    loading: false,
    loadSuccess: false,
    success: true,
    loadFailed: false,
    error: false,
    message: 'Bord has been updated successfully',
  })),
  on(BoardActions.UpdateBoardFailed, (state, { message }) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: true,
    message: message,
  })),
  // REMOVE
  on(BoardActions.RemoveBoard, (state, { id }) => ({
    ...state,
    id: id,
    board: null,
    loading: true,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(BoardActions.RemoveBoardSuccess, (state) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    loadSuccess: false,
    success: true,
    loadFailed: false,
    error: false,
    message: 'Bord has been removed successfully',
  })),
  on(BoardActions.RemoveBoardFailed, (state, { message }) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: true,
    message: message,
  })),
  on(BoardActions.ResetBoardState, (state) => boardInitialState)
);

export function boardReducer(state: BoardState, action: Action) {
  return _boardReducer(state, action);
}
