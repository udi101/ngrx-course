import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from "./reducers";

export const authState = createFeatureSelector<IAuthState>('auth');

export const isLoggedIn = createSelector(
  authState,
  state => !!state.user
);

export const isLoggedOut = createSelector(
  authState,
  state => !state.user
);
