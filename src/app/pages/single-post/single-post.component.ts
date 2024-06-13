import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post.model';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  post$!: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.post$ = this.postsService.getPostById(postId);
  }
}
