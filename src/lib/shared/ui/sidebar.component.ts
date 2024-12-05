import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <nav class="h-full bg-secondary p-4">
      <div class="mb-8">
        <h1 class="text-xl font-bold text-accent">Dashboard</h1>
      </div>

      @for (item of menuItems(); track item.path) {
      <a
        [routerLink]="item.path"
        routerLinkActive="bg-accent/10 text-accent"
        class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/5 transition-colors"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        {{ item.label }}
      </a>
      }
    </nav>
  `,
  imports: [],
})
export class SidebarComponent {
  menuItems = signal([
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/analytics', label: 'Analytics', icon: 'analytics' },
    { path: '/customers', label: 'Customers', icon: 'group' },
    { path: '/inventory', label: 'Inventory', icon: 'inventory' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ]);
}
