// app.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalService } from './global.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  logoutLabel: string;
  userData = signal({});
  userAvatar = signal({});
  gitHubLink = signal({});
  refreshToken = signal({});
  isLoggedIn = false;

  constructor(
    private globalService: GlobalService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.logoutLabel = globalService.logout;
    this.auth.currentUser.pipe(take(1)).subscribe((user) => {
      // Use pipe and take operators
      this.isLoggedIn = user != null; // Check if user is logged in
    });
  }

  signOut() {
    this.auth.signOut();
    this.isLoggedIn = false;
    this.cdr.detectChanges();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user) => {
      if (user && user.user_metadata) {
        this.isLoggedIn = user != null;
        console.log(this.isLoggedIn, 'logged in');
        this.userData = user.user_metadata['full_name'];
        this.userAvatar = user.user_metadata['avatar_url'];
        this.gitHubLink = user.user_metadata['user_name'];
        console.log(this.userData, 'full name');
        this.cdr.detectChanges();
      }
    });
  }
}
