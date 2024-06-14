import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  // Implements OnInit interface
  posts: Post[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
      },
      error: (error) => console.error(error),
    });
  }

  viewPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }
}
