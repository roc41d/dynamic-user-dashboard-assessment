import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { UserService } from '../../../../data-access/user.service';
import { getUsersResponse } from '../../../../interfaces/users-response';
import { listUsersActions } from './actions';

export const getUsersEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(listUsersActions.getUsers),
      switchMap((action) => {
        return userService.getUsers(action.page).pipe(
          map((users: getUsersResponse) => {
            return listUsersActions.getUsersSuccess({ users });
          }),
          catchError((error) => {
            return of(listUsersActions.getUsersFailure());
          }),
        );
      }),
    );
  },
  { functional: true },
);
