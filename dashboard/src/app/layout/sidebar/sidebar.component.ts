import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
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
