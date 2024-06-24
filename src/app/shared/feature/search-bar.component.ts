import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input
      matInput
      class="search-input"
      [formControl]="searchInput"
      placeholder="Search"
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
export class SearchBarComponent {
  public searchInput = new FormControl('');
}
