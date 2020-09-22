import { ActionReducerMap } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as p from './index';

export interface PState {
  profile: p.ProfileState;
}

export interface PAppState extends AppState {
  p: PState;
}

export const pAppReducers: ActionReducerMap<PState> = {
  profile: p.profileReducer,
};
