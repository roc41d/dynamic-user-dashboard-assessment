import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { listUsersActions } from '../../users/feature/list-users/data-access/store/actions';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input
      matInput
      class="search-input"
      [formControl]="searchInput"
      placeholder="Search by ID"
      type="text"
    />
  `,
  styles: [
    `
      .search-input {
        padding: 0.5em;
        border-radius: 1em;
        border: none;
        padding: 0.6em 1.2em;
        width: 120px;
        margin-right: 1em;
      }

      .search-input:focus {
        width: 200px;
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit {
  public searchInput = new FormControl('');

  private store = inject(Store);

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((searchText) => {
          if (!searchText) {
            this.store.dispatch(listUsersActions.getUsers({ page: 1 }));
          } else {
            this.store.dispatch(
              listUsersActions.updateUserSearchText({ searchText }),
            );
          }
        }),
      )
      .subscribe();
  }
}
