import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../../interfaces/user';
import { UserDetailState } from '../../../../interfaces/user-details-state';
import { userDetailActions } from './actions';

const initialState: UserDetailState = {
  user: {} as User,
  loading: false,
  error: null,
};

const userDetailFeature = createFeature({
  name: 'user-detail',
  reducer: createReducer(
    initialState,
    on(userDetailActions.getUserDetails, (state) => ({
      ...state,
      loading: true,
    })),
    on(userDetailActions.getUserDetailsSuccess, (state, action) => ({
      ...state,
      loading: false,
      user: action.user,
    })),
    on(userDetailActions.getUserDetailsFailure, (state) => ({
      ...state,
      loading: false,
    })),
    on(routerNavigationAction, () => initialState),
  ),
});

export const {
  name: userDetailFeatureKey,
  reducer: userDetailReducer,
  selectLoading,
  selectUser: getUser,
  selectError,
} = userDetailFeature;
