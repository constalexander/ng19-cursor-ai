import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent } from '@lib/shared/ui';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
  image?: string;
}

@Component({
  selector: 'app-inventory',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  products = signal<Product[]>([
    {
      id: 'P001',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 45,
      status: 'in_stock',
      lastUpdated: '2024-03-15',
    },
    {
      id: 'P002',
      name: 'Smart Watch',
      category: 'Electronics',
      price: 299.99,
      stock: 8,
      status: 'low_stock',
      lastUpdated: '2024-03-14',
    },
    {
      id: 'P003',
      name: 'Laptop Stand',
      category: 'Accessories',
      price: 49.99,
      stock: 0,
      status: 'out_of_stock',
      lastUpdated: '2024-03-10',
    },
  ]);

  getStockColor(status: string): string {
    switch (status) {
      case 'in_stock':
        return 'text-green-500';
      case 'low_stock':
        return 'text-yellow-500';
      case 'out_of_stock':
        return 'text-red-500';
      default:
        return '';
    }
  }

  getStockText(status: string): string {
    return status.replace(/_/g, ' ').toUpperCase();
  }
}
