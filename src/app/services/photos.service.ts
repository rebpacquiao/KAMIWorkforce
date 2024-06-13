import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Photos } from '../model/photos.model';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private apiUrl = environment.photoAPIUrl;

  constructor() {}

  getAllPosts(): Observable<Photos[]> {
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
