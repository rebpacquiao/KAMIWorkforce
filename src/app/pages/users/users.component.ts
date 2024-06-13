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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
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
  allUsers: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchTerm: string = '';

  constructor(
    private postsService: UsersService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.fetchUsers();
  }

  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.data = this.allUsers.filter(
      (user: User) =>
        user.name.toLowerCase().includes(filterValue) ||
        user.username.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
    );
  }

  fetchUsers(): void {
    this.postsService.getAllPosts().subscribe({
      next: (data: User[]) => {
        this.allUsers = data;
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
