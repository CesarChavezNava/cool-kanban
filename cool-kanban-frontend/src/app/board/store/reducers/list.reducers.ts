import { Action, createReducer, on } from '@ngrx/store';
import { List } from '@shared/models/list';

import * as ListActions from '../actions/list.actions';

export interface ListState {
  id: string;
  list: List;
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export const listInitialState: ListState = {
  id: null,
  list: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

const _listReducer = createReducer(
  listInitialState,
  // ADD
  on(ListActions.CreateList, (state, { list }) => ({
    ...state,
    id: null,
    list: list,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(ListActions.CreateListSuccess, (state, { list }) => ({
    ...state,
    id: null,
    list: list,
    loading: false,
    success: true,
    error: false,
    message: null,
  })),
  on(ListActions.CreateListFailed, (state, { message }) => ({
    ...state,
    id: null,
    list: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  // UPDATE
  on(ListActions.UpdateList, (state, { list }) => ({
    ...state,
    id: null,
    list: list,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(ListActions.UpdateListSuccess, (state, { list }) => ({
    ...state,
    id: null,
    list: list,
    loading: false,
    success: true,
    error: false,
    message: null,
  })),
  on(ListActions.UpdateListFailed, (state, { message }) => ({
    ...state,
    id: null,
    list: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  // REMOVE
  on(ListActions.RemoveList, (state, { id }) => ({
    ...state,
    id: id,
    list: null,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(ListActions.RemoveListSuccess, (state) => ({
    ...state,
    id: null,
    list: null,
    loading: false,
    success: true,
    error: false,
    message: 'List has been removed successfully',
  })),
  on(ListActions.RemoveListFailed, (state, { message }) => ({
    ...state,
    id: null,
    list: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  on(ListActions.ResetListState, (state) => listInitialState)
);

export function listReducer(state: ListState, action: Action) {
  return _listReducer(state, action);
}
