import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobalService } from './global.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavItem } from '../app/model/nav.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
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

  navItems: NavItem[] = [
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/dashboard',
      buttonClass:
        'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize',
      buttonText: 'dashboard',
    },
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/list',
      buttonClass:
        'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize',
      buttonText: 'List',
    },
    {
      ariaCurrent: 'page',
      routerLinkActive: ['active'],
      routerLinkActiveOptions: { exact: true },
      routerLink: '/album',
      buttonClass:
        'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize',
      buttonText: 'Albums',
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
    this.cdr.detectChanges();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user) => {
      if (user && user.user_metadata) {
        this.isLoggedIn = user != null;
        this.userData = user.user_metadata['full_name'];
        this.userAvatar = user.user_metadata['avatar_url'];
        this.gitHubLink = user.user_metadata['user_name'];
        console.log(this.userData, 'full name');
        this.cdr.detectChanges();
      }
    });
  }
}
