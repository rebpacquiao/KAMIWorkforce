import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root', // Assuming posts are globally accessible
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor() {}

  // Fetch all posts using fetch API and return an Observable
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
