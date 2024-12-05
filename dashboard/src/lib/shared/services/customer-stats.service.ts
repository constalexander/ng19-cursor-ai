import { Injectable, computed, effect, signal } from '@angular/core';

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  averageRevenue: number;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerStatsService {
  // Base signals
  private customers = signal<any[]>([]);
  private timeframe = signal<'day' | 'week' | 'month' | 'year'>('month');

  // Computed signals
  readonly stats = computed<CustomerStats>(() => {
    const currentCustomers = this.customers();
    const active = currentCustomers.filter(c => c.status === 'active');
    const revenue = currentCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

    return {
      totalCustomers: currentCustomers.length,
      activeCustomers: active.length,
      totalRevenue: revenue,
      averageRevenue: revenue / currentCustomers.length || 0,
    };
  });

  readonly activePercentage = computed(() => {
    const stats = this.stats();
    return (stats.activeCustomers / stats.totalCustomers) * 100 || 0;
  });

  constructor() {
    // Effect to log stats changes
    effect(() => {
      const stats = this.stats();
      console.log(`Stats updated for ${this.timeframe()}:`, stats);
    });
  }

  updateCustomers(customers: any[]) {
    this.customers.set(customers);
  }

  setTimeframe(timeframe: 'day' | 'week' | 'month' | 'year') {
    this.timeframe.set(timeframe);
  }
}
