import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastOrder: string;
  totalSpent: number;
}

@Component({
  selector: 'app-customers',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatChipsModule],
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  displayedColumns = ['name', 'email', 'status', 'lastOrder', 'totalSpent'];
  dataSource!: MatTableDataSource<Customer>;
  customers = signal<Customer[]>([
    {
      id: 'C001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'active',
      lastOrder: '2024-03-15',
      totalSpent: 1234.56,
    },
    {
      id: 'C002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'active',
      lastOrder: '2024-03-10',
      totalSpent: 2345.67,
    },
    {
      id: 'C003',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      status: 'inactive',
      lastOrder: '2024-02-28',
      totalSpent: 890.12,
    },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.customers());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return 'info';
    }
  }
}
