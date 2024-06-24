import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './shared/ui/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="main">
      <app-header />
      <div class="content">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AppComponent {}
