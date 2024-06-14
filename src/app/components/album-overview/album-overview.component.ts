import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Post } from '../../model/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-overview.component.html',
  styleUrl: './album-overview.component.scss',
})
export class AlbumOverviewComponent {
  constructor(private postsService: AlbumService, private router: Router) {}
  posts: Post[] = [];

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
      },
      error: (error) => console.error(error),
    });
  }

  viewPost(postId: number): void {
    this.router.navigate(['/single-album', postId]);
  }
}
