import { routerNavigationAction } from "@ngrx/router-store";
import { createFeature, createReducer, on } from "@ngrx/store";
import { UsersState } from "../../../../interfaces/users-state";
import { listUsersActions } from "./actions";

const initialState: UsersState = {
    users: [],
    total: 0,
    loading: false,
    error: null,
  };
  
  const listUsersFeature = createFeature({
    name: 'list-users',
    reducer: createReducer(
      initialState,
      on(listUsersActions.getUsers, (state) => ({ ...state, loading: true })),
      on(listUsersActions.getUsersSuccess, (state, action) => ({
        ...state,
        loading: false,
        users: action.users.data,
        total: action.users.total,
      })),
      on(listUsersActions.getUsersFailure, (state) => ({ ...state, loading: false })),
      on(routerNavigationAction, () => initialState),
    ),
  });
  
  export const {
    name: listUsersFeatureKey,
    reducer: listUsersReducer,
    selectLoading,
    selectUsers: getUsers,
    selectTotal,
    selectError,
  } = listUsersFeature;