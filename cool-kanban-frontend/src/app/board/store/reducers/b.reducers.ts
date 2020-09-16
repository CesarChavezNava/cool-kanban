import { ActionReducerMap } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as b from './index';

export interface BState {
  boards: b.BoardsState;
  board: b.BoardState;
  list: b.ListState;
}

export interface BAppState extends AppState {
  b: BState;
}

export const bAppReducers: ActionReducerMap<BState> = {
  boards: b.boardsReducer,
  board: b.boardReducer,
  list: b.listReducer,
};
