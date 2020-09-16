import { ActionReducerMap } from '@ngrx/store';

import * as auth from './auth/store/reducers';

export interface AppState {
  signUp: auth.SignUpState;
  signIn: auth.SignUpState;
  forgotPassword: auth.ForgotPasswordState;
}

export const appReducers: ActionReducerMap<AppState> = {
  signUp: auth.signUpReducer,
  signIn: auth.signInReducer,
  forgotPassword: auth.forgotPasswordReducer,
};
