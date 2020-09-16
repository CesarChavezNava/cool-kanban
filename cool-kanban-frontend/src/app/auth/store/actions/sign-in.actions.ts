import { createAction, props } from '@ngrx/store';

export const SignIn = createAction(
  '[Auth] Sign in',
  props<{ email: string; password: string }>()
);

export const SignInSuccess = createAction('[Auth] Sign in successfully');

export const SignInFailed = createAction(
  '[Auth] Sign in failed',
  props<{ message: string }>()
);

export const ResetSignInState = createAction('[Auth] Reset sign in state');
