import { createAction, props } from '@ngrx/store';
import { Profile } from '@shared/models/profile';

export const GetProfile = createAction('[Profile] Get profile');

export const GetProfileSuccess = createAction(
  '[Profile] Get profile successfully',
  props<{ profile: Profile }>()
);

export const GetProfileFailed = createAction(
  '[Profile] Get profile failed',
  props<{ message: string }>()
);

export const UpdateProfile = createAction(
  '[Profile] Update profile',
  props<{ profile: Profile }>()
);

export const UpdateProfileSuccess = createAction(
  '[Profile] Update profile successfully',
  props<{ profile: Profile }>()
);

export const UpdateProfileFailed = createAction(
  '[Profile] Update profile failed',
  props<{ message: string }>()
);

export const ResetProfileState = createAction('[Board] Rest profile state');
