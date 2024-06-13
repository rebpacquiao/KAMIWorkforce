import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = environment.postAPIUrl;

  constructor() {}

  getAllPosts(): Observable<Post[]> {
    return from(
      fetch(this.apiUrl).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    );
  }
}
