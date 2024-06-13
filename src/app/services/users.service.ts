import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../model/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.userAPIUrl;

  constructor() {}

  getAllPosts(): Observable<User[]> {
    return from(
      fetch(this.apiUrl).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    );
  }

  getPostById(id: number): Observable<User> {
    return from(
      fetch(`${this.apiUrl}/${id}`).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    );
  }
}
