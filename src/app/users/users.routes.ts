import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as listUsersEffect from './feature/list-users/data-access/store/effects';
import {
  listUsersFeatureKey,
  listUsersReducer,
} from './feature/list-users/data-access/store/reducers';
import * as userDetailEffect from './feature/user-details/data-access/store/effects';
import {
  userDetailFeatureKey,
  userDetailReducer,
} from './feature/user-details/data-access/store/reducers';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/list-users/list-users.component').then(
        (comp) => comp.ListUsersComponent,
      ),
    providers: [
      provideState(listUsersFeatureKey, listUsersReducer),
      provideEffects(listUsersEffect),
    ],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./feature/user-details/user-details.component').then(
        (comp) => comp.UserDetailsComponent,
      ),
    providers: [
      provideState(userDetailFeatureKey, userDetailReducer),
      provideEffects(userDetailEffect),
    ],
  },
];
