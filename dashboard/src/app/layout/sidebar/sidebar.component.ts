import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppStateService } from '@lib/core/state/app-state.service';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="h-full bg-secondary p-4">
      <div class="mb-8">
        <h1 class="text-xl font-bold text-accent">Dashboard</h1>
      </div>

      @for (item of menuItems; track item.path) {
      <a
        [routerLink]="item.path"
        routerLinkActive="bg-accent/10 text-accent"
        class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/5 transition-colors"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        @if (!sidebarCollapsed()) {
        <span>{{ item.label }}</span>
        }
      </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  private appState = inject(AppStateService);
  readonly sidebarCollapsed = this.appState.sidebarCollapsed;

  // Instead of using signal, we'll use a regular array since it's static
  menuItems = [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/analytics', label: 'Analytics', icon: 'analytics' },
    { path: '/customers', label: 'Customers', icon: 'group' },
    { path: '/inventory', label: 'Inventory', icon: 'inventory' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ] satisfies MenuItem[];
}
