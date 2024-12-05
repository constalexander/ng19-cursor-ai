import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { CardComponent, CardHeaderComponent, CardContentComponent } from '@lib/shared/ui';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, MatCardModule, CardComponent, CardHeaderComponent, CardContentComponent, BaseChartDirective],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  salesData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Sales',
        fill: true,
        tension: 0.5,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
      },
    ],
  };

  salesOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  trafficData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Direct', 'Social', 'Referral', 'Organic'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ['rgb(99, 102, 241)', 'rgb(244, 63, 94)', 'rgb(34, 197, 94)', 'rgb(234, 179, 8)'],
      },
    ],
  };

  trafficOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };
}
