import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DashboardMetric {
  label: string;
  value: number;
  trend: 'up' | 'down';
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  metrics = signal<DashboardMetric[]>([
    { label: 'Total Revenue', value: 54232, trend: 'up', percentage: 12 },
    { label: 'Active Users', value: 2834, trend: 'up', percentage: 8 },
    { label: 'New Orders', value: 456, trend: 'down', percentage: 3 },
    { label: 'Conversion Rate', value: 3.6, trend: 'up', percentage: 4 },
  ]);
}
