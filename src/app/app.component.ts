import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalService } from './global.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavItem } from '../app/model/nav.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading = new BehaviorSubject<boolean>(false);
  logoutLabel: string;
  userData = signal({});
  userAvatar = signal({});
  gitHubLink = signal({});
  refreshToken = signal({});
  isLoggedIn = false;
  private routerSubscription: Subscription | undefined;

  navItems: NavItem[] = [
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/dashboard',
      buttonClass: 'text-xs uppercase py-3 font-bold block text-white',
      buttonText: 'dashboard',
      icon: 'dashboard',
    },
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/post',
      buttonClass: 'text-xs uppercase py-3 font-bold block text-white',
      buttonText: 'Post',
      icon: 'signpost',
    },
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/album',
      buttonClass: 'text-xs uppercase py-3 font-bold block text-white',
      buttonText: 'Albums',
      icon: 'auto_stories',
    },
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/photo',
      buttonClass: 'text-xs uppercase py-3 font-bold block text-white',
      buttonText: 'Photos',
      icon: 'photo_camera',
    },
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/users',
      buttonClass: 'text-xs uppercase py-3 font-bold block text-white',
      buttonText: 'Users',
      icon: 'group',
    },
  ];

  constructor(
    private globalService: GlobalService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.logoutLabel = globalService.logout;
    this.auth.currentUser.pipe(take(1)).subscribe((user) => {
      this.isLoggedIn = user != null;
    });
  }

  signOut() {
    this.auth.signOut();
    this.isLoggedIn = false;
    this.isLoading.next(false);
    this.cdr.detectChanges();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.next(true);
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading.next(false);
        }, 2000);
      }
    });

    this.isLoading.next(true);
    this.auth.currentUser.subscribe((user) => {
      if (user && user.user_metadata) {
        this.isLoggedIn = user != null;
        this.userData = user.user_metadata['full_name'];
        this.userAvatar = user.user_metadata['avatar_url'];
        this.gitHubLink = user.user_metadata['user_name'];
        setTimeout(() => {
          this.isLoading.next(false);
        }, 2000);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
