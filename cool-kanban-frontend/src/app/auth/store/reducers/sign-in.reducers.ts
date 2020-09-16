import { createReducer, on, Action } from '@ngrx/store';

import * as SignInActions from '../actions/sign-in.actions';

export interface SignInState {
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export const signInInitialState: SignInState = {
  loading: false,
  error: false,
  success: false,
  message: null,
};

const _signInReducer = createReducer(
  signInInitialState,
  on(SignInActions.SignIn, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(SignInActions.SignInSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
    error: false,
    message: 'SignInSuccess',
  })),
  on(SignInActions.SignInFailed, (state, { message }) => ({
    ...state,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  on(SignInActions.ResetSignInState, (state) => signInInitialState)
);

export function signInReducer(state: SignInState, action: Action) {
  return _signInReducer(state, action);
}
