import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { getUsersResponse } from '../interfaces/users-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  getUsers(page: number): Observable<getUsersResponse> {
    const url = `${this.userUrl}?page=${page}`;
    return this.http.get<getUsersResponse>(url);
  }
}
