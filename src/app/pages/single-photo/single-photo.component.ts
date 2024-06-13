import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PhotosService } from '../../services/photos.service';
import { Photos } from '../../model/photos.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-single-photo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './single-photo.component.html',
  styleUrl: './single-photo.component.scss',
})
export class SinglePhotoComponent {
  post$!: Observable<Photos>;

  constructor(
    private postsService: PhotosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.post$ = this.postsService.getPostById(postId);
  }
}
