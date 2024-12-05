import { Component } from '@angular/core';
import { SidebarComponent } from '../../lib/shared/ui/sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-primary">
      <app-sidebar class="w-64 hidden md:block" />
      <main class="flex-1 p-6">
        <ng-content />
      </main>
    </div>
  `,
})
export class ShellComponent {}
