import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from '../../services/photos.service';
import { Photos } from '../../model/photos.model';

@Component({
  selector: 'app-photos-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photos-overview.component.html',
  styleUrl: './photos-overview.component.scss',
})
export class PhotosOverviewComponent {
  posts: Photos[] = [];
  constructor(private postsService: PhotosService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (data: Photos[]) => {
        this.posts = data.slice(0, 9);
      },
      error: (error) => console.error(error),
    });
  }
}
