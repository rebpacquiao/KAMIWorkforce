import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ReportCard {
  category: string;
  value: string;
  icon: string;
  percentageChange: string;
  changeType: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss',
})
export class ReportCardComponent {
  reportCards: ReportCard[] = [
    {
      category: 'Traffic',
      value: '350,897',
      icon: 'payments',
      percentageChange: '3.48%',
      changeType: 'Since last month',
      backgroundColor: 'bg-violet-50',
    },
    {
      category: 'NEW USERS',
      value: '350,897',
      icon: 'person',
      percentageChange: '3.48%',
      changeType: 'Since last week',
      backgroundColor: 'bg-emerald-500',
    },
    {
      category: 'SALES',
      value: '924',
      icon: 'library_books',
      percentageChange: '1.10%',
      changeType: 'Since yesterday',
      backgroundColor: 'bg-green-500',
    },
    {
      category: 'Peromance',
      value: '49,65%',
      icon: 'shopping_cart',
      percentageChange: '12%',
      changeType: 'Since last month',
      backgroundColor: 'bg-yellow-500',
    },
  ];
}
