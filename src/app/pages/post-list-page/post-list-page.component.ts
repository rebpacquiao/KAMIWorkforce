import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Post } from '../../model/post.model';

@Component({
  selector: 'app-post-list-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss'],
})
export class PostListPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'userId', 'title', 'body', 'action'];
  dataSource = new MatTableDataSource<Post>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => console.error(error),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
