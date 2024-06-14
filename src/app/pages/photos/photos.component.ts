import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from '../../services/photos.service';
import { Photos } from '../../model/photos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  posts: Photos[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 24;

  constructor(
    private photosService: PhotosService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchPhotos();
  }

  fetchPhotos(): void {
    this.photosService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.map((post) => ({
          albumId: post.albumId || 0,
          id: post.id,
          title: post.title,
          url: post.url,
          thumbnailUrl: post.thumbnailUrl || post.url,
        }));

        this.changeDetectorRef.detectChanges();
      },
      error: (error) => console.error(error),
    });
  }

  viewPost(postId: number): void {
    this.router.navigate(['/single-photo', postId]);
  }

  get paginatedPosts(): Photos[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.posts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    this.currentPage++;
  }

  previousPage(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }
}
