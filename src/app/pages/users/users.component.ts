import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { User } from '../../model/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'city',
    'phone',
    'website',
    'companyName',
    'action',
  ];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postsService: UsersService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.postsService.getAllPosts().subscribe({
      next: (data: User[]) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Failed to fetch users:', error);
        this.cdr.detectChanges();
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewPost(postId: number): void {
    this.router.navigate(['/profile', postId]);
  }
}
