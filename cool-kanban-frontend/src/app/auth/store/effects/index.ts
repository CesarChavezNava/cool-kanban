import { SignInEffects } from './sign-in.effects';
import { SignUpEffects } from './sign-up.effects';
import { ForgotPasswordEffects } from './forgot-password.effects';

export const AuthEffects: any[] = [
  SignInEffects,
  SignUpEffects,
  ForgotPasswordEffects,
];
