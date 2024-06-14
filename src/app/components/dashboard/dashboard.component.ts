import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('DashboardComponent initialized');
  }
}
