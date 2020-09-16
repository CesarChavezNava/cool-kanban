import { createReducer, on, Action } from '@ngrx/store';

import * as SignUpActions from '../actions/sign-up.actions';

export interface SignUpState {
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export const signUpInitialState: SignUpState = {
  loading: false,
  error: false,
  success: false,
  message: null,
};

const _signUpReducer = createReducer(
  signUpInitialState,
  on(SignUpActions.SignUp, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(SignUpActions.SignUpSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
    error: false,
    message: 'Sign up has been completed successfully',
  })),
  on(SignUpActions.SignUpFailed, (state, { message }) => ({
    ...state,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  on(SignUpActions.ResetSignUpState, (state) => signUpInitialState)
);

export function signUpReducer(state: SignUpState, action: Action) {
  return _signUpReducer(state, action);
}
