import { Component, signal, ViewChild, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, FormBuilder } from '@angular/forms';
import { InteractiveDirective } from '@lib/shared/directives';
import { CustomerStatsService } from '@lib/shared/services/customer-stats.service';
import { CardComponent, CardContentComponent } from '@lib/shared/ui';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastOrder: string;
  totalSpent: number;
  joinDate: string;
  country: string;
}

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    InteractiveDirective,
    CardComponent,
    CardContentComponent,
  ],
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit, AfterViewInit {
  private customerStats = inject(CustomerStatsService);
  private fb = inject(FormBuilder);

  displayedColumns = ['name', 'email', 'status', 'country', 'lastOrder', 'totalSpent'];
  dataSource!: MatTableDataSource<Customer>;
  customers = signal<Customer[]>([
    {
      id: 'C001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'active',
      lastOrder: '2024-03-15',
      totalSpent: 1234.56,
      joinDate: '2023-01-15',
      country: 'United States',
    },
    {
      id: 'C002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'active',
      lastOrder: '2024-03-10',
      totalSpent: 2345.67,
      joinDate: '2023-02-20',
      country: 'Canada',
    },
    {
      id: 'C003',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      status: 'inactive',
      lastOrder: '2024-02-28',
      totalSpent: 890.12,
      joinDate: '2023-03-05',
      country: 'United Kingdom',
    },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly stats = this.customerStats.stats;
  readonly activePercentage = this.customerStats.activePercentage;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.customers());
    this.customerStats.updateCustomers(this.customers());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowInteraction(state: { hovered: boolean; focused: boolean }, row: Customer) {
    console.log('Row interaction:', { state, customer: row });
  }
}
