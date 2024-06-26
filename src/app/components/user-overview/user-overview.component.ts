import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit {
  // Added 'implements OnInit'
  constructor(private postsService: UsersService, private router: Router) {}
  posts: User[] = [];

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (data: User[]) => {
        this.posts = data;
      },
      error: (error) => console.error(error),
    });
  }

  viewPost(postId: number): void {
    this.router.navigate(['/profile', postId]);
  }
}
