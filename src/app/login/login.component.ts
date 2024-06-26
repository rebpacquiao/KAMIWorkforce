import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    WelcomeComponent,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data: Post[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data: Post[]) => {
        this.data = data;
      });
  }
}
