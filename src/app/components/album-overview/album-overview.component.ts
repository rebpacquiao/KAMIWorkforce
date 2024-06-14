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
  styleUrls: ['./album-overview.component.scss'], // Corrected property name from 'styleUrl' to 'styleUrls'
})
export class AlbumOverviewComponent implements OnInit {
  // Implements OnInit interface
  posts: Post[] = [];

  constructor(private postsService: AlbumService, private router: Router) {}

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
    this.router.navigate(['/single-album', postId]);
  }
}
