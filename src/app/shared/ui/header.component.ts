import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../feature/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, SearchBarComponent],
  template: `
    <mat-toolbar color="primary">
      <span>Dynamic User Dashboard Assessment</span>
      <span class="spacer"></span>

      <app-search-bar />
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class HeaderComponent {}
