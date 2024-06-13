import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post.model';

@Component({
  selector: 'app-post-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss'],
})
export class PostListPageComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => console.error(error),
    });
  }
}
