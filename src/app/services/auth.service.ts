import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private supabase!: SupabaseClient;
  private excludedPathsForDashboard = ['/list', 'post/:id'];

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );

    // Check if user session exists in storage when AuthService initializes
    const session = sessionStorage.getItem('supabaseSession');
    if (session) {
      const userSession = JSON.parse(session);
      this.user.next(userSession.currentSession.user);
    }

    this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session?.user ?? null);
        sessionStorage.setItem(
          'supabaseSession',
          JSON.stringify({ currentSession: session })
        );
        if (!router.url.includes('list')) {
          this.router.navigate(['/dashboard']);
        }
      } else if (
        event === 'SIGNED_OUT' ||
        session === undefined ||
        session === null
      ) {
        sessionStorage.removeItem('supabaseSession');
        this.router.navigate(['/login']);
      }
    });
  }

  async signInWithGithub() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
    sessionStorage.removeItem('supabaseSession');
    this.user.next(null);
  }

  get currentUser() {
    return this.user.asObservable();
  }
}
