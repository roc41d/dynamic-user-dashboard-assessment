import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { getUsersResponse } from '../../../../interfaces/users-response';

export const listUsersActions = createActionGroup({
  source: 'list-users',
  events: {
    'Get Users': props<{ page: number }>(),
    'Get Users Success': props<{ users: getUsersResponse }>(),
    'Get Users Failure': emptyProps(),

    'Update User Search Text': props<{ searchText: string }>(),
  },
});
