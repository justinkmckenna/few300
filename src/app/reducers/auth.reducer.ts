import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  userName?: string;
  token?: string;
}

const initialState: AuthState = { isLoggedIn: false };

const reducerFunction = createReducer(
  initialState,
  on(actions.logoutRequested, actions.loginRequested, actions.loginFailed, () => initialState),
  on(actions.loginSuccess, (state, action) => ({
    isLoggedIn: true,
    username: action.username,
    token: action.token
  }))
);

export function reducer(state: AuthState, action: Action): AuthState {
  return reducerFunction(state, action);
}
