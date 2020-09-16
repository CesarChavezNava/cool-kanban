import { createAction, props } from '@ngrx/store';

export const SendPasswordResetEmail = createAction(
  '[Auth] Send password reset email',
  props<{ email: string }>()
);
export const SendPasswordResetEmailSuccess = createAction(
  '[Auth] Send password reset email successfully'
);
export const SendPasswordResetEmailFailed = createAction(
  '[Auth] Send password reset email failed',
  props<{ message: string }>()
);

export const ResetForgotPasswordState = createAction(
  '[Auth] Reset state forgot password'
);
