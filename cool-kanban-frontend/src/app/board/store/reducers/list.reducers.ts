import { Action, createReducer, on } from '@ngrx/store';
import { List } from '@shared/models/list';

import * as ListActions from '../actions/list.actions';

export interface ListState {
  list: List;
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export const listInitialState: ListState = {
  list: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

const _listReducer = createReducer(
  listInitialState,
  // UPDATE
  on(ListActions.UpdateList, (state, { list }) => ({
    ...state,
    list: list,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(ListActions.UpdateListSuccess, (state, { list }) => ({
    ...state,
    list: list,
    loading: false,
    success: false,
    error: false,
    message: null,
  })),
  on(ListActions.UpdateListFailed, (state, { message }) => ({
    ...state,
    list: null,
    loading: false,
    success: false,
    error: false,
    message: message,
  })),
  on(ListActions.ResetListState, (state) => listInitialState)
);

export function listReducer(state: ListState, action: Action) {
  return _listReducer(state, action);
}
