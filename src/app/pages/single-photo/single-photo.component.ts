import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent implements OnInit {
  post$!: Observable<Photos>;

  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const photoId = this.route.snapshot.params['id'];
    this.post$ = this.photosService.getPostById(photoId);
    this.changeDetectorRef.detectChanges();
  }
}
