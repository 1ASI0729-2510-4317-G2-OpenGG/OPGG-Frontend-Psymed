import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../domain/auth.models';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loading: false,
    error
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.logoutSuccess, () => ({
    ...initialState
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
