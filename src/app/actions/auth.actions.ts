import { createAction, props } from '@ngrx/store';

export const loginRequested = createAction(
  '[app] auth login requested',
  props<{username: string; password: string}>()
);

export const loginSuccess = createAction(
  '[app] auth login success',
  props<{username: string; token: string}>()
);

export const loginFailed = createAction(
  '[app] auth login failed',
  props<{reason: string}>()
);

export const logoutRequested = createAction(
  '[app] auth logout requested'
);

export const checkCreds = createAction(
  '[app] check creds'
);
