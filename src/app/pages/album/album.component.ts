import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Post } from '../../model/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'userId', 'title', 'action'];
  dataSource = new MatTableDataSource<Post>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postsService: AlbumService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => console.error(error),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewPost(postId: number): void {
    this.router.navigate(['/single-album', postId]);
  }
}
