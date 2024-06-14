import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserMetadata {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<UserMetadata | null>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  setUserMetadata(metadata: UserMetadata) {
    this.userDataSubject.next(metadata);
  }
}
