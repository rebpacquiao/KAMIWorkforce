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
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface Sorting {
  value: string;
  viewValue: string;
}

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
    MatSelectModule,
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
  currentSortOrder: string = '';
  sort: { value: string; viewValue: string }[] = [
    { value: 'name-asc', viewValue: 'Ascending' },
    { value: 'name-desc', viewValue: 'Descending' },
  ];

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

  sortData(sortOrder: string, propertyName: string): void {
    const sortedData = this.allUsers.sort((a, b) => {
      // Corrected from `property` to `propertyName`
      const aValue = (a as any)[propertyName];
      const bValue = (b as any)[propertyName];

      if (aValue < bValue) {
        return sortOrder === 'name-asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'name-asc' ? 1 : -1;
      }
      return 0;
    });

    this.dataSource.data = sortedData;
    this.cdr.detectChanges();
  }
}
