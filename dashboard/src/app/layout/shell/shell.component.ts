import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AppStateService, ToggleSidebarCommand } from '@lib/core/state/app-state.service';

@Component({
  selector: 'app-shell',
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-primary">
      <app-sidebar
        [class.w-64]="!sidebarCollapsed()"
        [class.w-16]="sidebarCollapsed()"
        class="hidden md:block transition-all duration-300"
      />
      <main class="flex-1 p-6">
        <button class="mb-4 p-2 rounded-lg hover:bg-secondary" (click)="toggleSidebar()">
          <span class="material-symbols-outlined">
            {{ sidebarCollapsed() ? 'menu_open' : 'menu' }}
          </span>
        </button>
        <ng-content />
      </main>
    </div>
  `,
})
export class ShellComponent {
  private appState = inject(AppStateService);
  readonly sidebarCollapsed = this.appState.sidebarCollapsed;

  toggleSidebar() {
    this.appState.dispatch(new ToggleSidebarCommand());
  }
}
