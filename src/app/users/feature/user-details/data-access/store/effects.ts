import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { UserService } from '../../../../data-access/user.service';
import { User } from '../../../../interfaces/user';
import { userDetailActions } from './actions';

export const getUserDetailEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userDetailActions.getUserDetails),
      switchMap((action) => {
        return userService.getUser(action.userId).pipe(
          map((user: User) => {
            return userDetailActions.getUserDetailsSuccess({ user });
          }),
          catchError((error) => {
            return of(userDetailActions.getUserDetailsFailure());
          }),
        );
      }),
    );
  },
  { functional: true },
);
