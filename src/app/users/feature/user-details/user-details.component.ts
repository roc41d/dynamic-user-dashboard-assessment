import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { userDetailActions } from './data-access/store/actions';
import {
  selectLoading,
  getUser,
  selectError,
} from './data-access/store/reducers';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '../../../shared/ui/loader.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    LoaderComponent,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ]
})
export class UserDetailsComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  data$ = combineLatest({
    isLoading: this.store.select(selectLoading),
    user: this.store.select(getUser),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    const userId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.store.dispatch(userDetailActions.getUserDetails({ userId }));
  }
}
