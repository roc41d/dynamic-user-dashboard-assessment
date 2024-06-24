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
import { UserCardComponent } from './ui/user-card/user-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderComponent } from '../../../shared/ui/loader.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [AsyncPipe, UserCardComponent, MatPaginatorModule, LoaderComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
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

  pageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.loadUsers(this.currentPage);
  }
}
