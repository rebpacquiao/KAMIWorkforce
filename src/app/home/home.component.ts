import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GlobalService } from '../global.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PostComponent } from '../components/post/post.component';
import { ReportCardComponent } from '../components/report-card/report-card.component';
import { PhotosOverviewComponent } from '../components/photos-overview/photos-overview.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatProgressBarModule,
    PostComponent,
    ReportCardComponent,
    PhotosOverviewComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  apiKey: string = environment.API_KEY;
  baseUrl: string = environment.BASE_URL;

  constructor(
    private globalService: GlobalService,
    private httpClient: HttpClient,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
}
