import { createAction, props } from '@ngrx/store';

export const SignUp = createAction(
  '[Auth] Sign up',
  props<{ email: string; password: string }>()
);
export const SignUpSuccess = createAction('[Auth] Sign up successfully');

export const SignUpFailed = createAction(
  '[Auth] Sign up failed',
  props<{ message: string }>()
);

export const ResetSignUpState = createAction('[Auth] Reset sign up state');
