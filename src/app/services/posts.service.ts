import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Post } from '../model/post.model';

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

  getPostById(id: number): Observable<Post> {
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
