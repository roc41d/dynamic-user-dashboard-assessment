import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    @if (isLoading) {
    <div class="spinner">
      <mat-spinner></mat-spinner>
    </div>
    }
  `,
  styles: [
    `
      .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class LoaderComponent {
  @Input() isLoading = false;
}
