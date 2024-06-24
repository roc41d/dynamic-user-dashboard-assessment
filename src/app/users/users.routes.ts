import { Route } from '@angular/router';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/list-users/list-users.component').then(
        (comp) => comp.ListUsersComponent,
      ),
  },
];
