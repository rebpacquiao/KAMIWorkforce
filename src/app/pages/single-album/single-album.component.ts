import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-single-album',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss'],
})
export class SingleAlbumComponent implements OnInit {
  post$!: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.post$ = this.postsService.getPostById(postId);
    this.changeDetectorRef.detectChanges();
  }
}
