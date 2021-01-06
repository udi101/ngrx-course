import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthActions } from '../actions';
import { User } from '../model/user.model';

export interface IAuthState {
  user: User
}

export const initiaIAuthState: IAuthState = {
  user: undefined
};

export const authReducer = createReducer<IAuthState>(
  initiaIAuthState,
  on(AuthActions.login, (authState, action) => {
    return { user: action.user };
  }),

  on(AuthActions.logout, () => {
    return { user: undefined };
  })
)
