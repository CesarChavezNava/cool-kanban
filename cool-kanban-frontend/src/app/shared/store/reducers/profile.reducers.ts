import { Action, createReducer, on } from '@ngrx/store';
import { Profile } from '@shared/models/profile';

import * as ProfileActions from '../actions/profile.actions';

export interface ProfileState {
  profile: Profile;
  loading: boolean;
  loadSuccess: boolean;
  success: boolean;
  loadFailed: boolean;
  error: boolean;
  message: string;
}

export const profileInitialState: ProfileState = {
  profile: null,
  loading: false,
  loadSuccess: false,
  success: false,
  loadFailed: false,
  error: false,
  message: null,
};

const _profileReducer = createReducer(
  profileInitialState,
  // GET
  on(ProfileActions.GetProfile, (state) => ({
    ...state,
    profile: null,
    loading: true,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(ProfileActions.GetProfileSuccess, (state, { profile }) => ({
    ...state,
    profile: profile,
    loading: false,
    loadSuccess: true,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(ProfileActions.GetProfileFailed, (state, { message }) => ({
    ...state,
    profile: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: true,
    error: false,
    message: message,
  })),
  // UPDATE
  on(ProfileActions.UpdateProfile, (state, { profile }) => ({
    ...state,
    profile: profile,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: false,
    message: null,
  })),
  on(ProfileActions.UpdateProfileSuccess, (state, { profile }) => ({
    ...state,
    profile: profile,
    loading: false,
    loadSuccess: false,
    success: true,
    loadFailed: false,
    error: false,
    message: 'Your profile has been updated successfully',
  })),
  on(ProfileActions.UpdateProfileFailed, (state, { message }) => ({
    ...state,
    profile: null,
    loading: false,
    loadSuccess: false,
    success: false,
    loadFailed: false,
    error: true,
    message: message,
  })),
  on(ProfileActions.ResetProfileState, (state) => profileInitialState)
);

export function profileReducer(state: ProfileState, action: Action) {
  return _profileReducer(state, action);
}
