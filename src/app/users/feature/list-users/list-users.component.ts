import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectLoading,
  getUsers,
  selectError,
  selectTotal,
} from './data-access/store/reducers';
import { listUsersActions } from './data-access/store/actions';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent implements OnInit {
  private currentPage = 1;
  private store = inject(Store);

  data$ = combineLatest({
    isLoading: this.store.select(selectLoading),
    users: this.store.select(getUsers),
    error: this.store.select(selectError),
    total: this.store.select(selectTotal),
  });

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.store.dispatch(listUsersActions.getUsers({ page }));
  }
}
