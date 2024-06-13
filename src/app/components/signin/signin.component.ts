import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../global.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  loginDescription: string;
  loginLabel: string;

  constructor(
    private auth: AuthService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginDescription = globalService.description;
    this.loginLabel = globalService.login;
  }
  async handleAuth() {
    const response = await this.auth.signInWithGithub();

    console.log(response);
  }

  ngOninit() {
    window.location.reload();
    this.cdr.detectChanges();
  }
}
