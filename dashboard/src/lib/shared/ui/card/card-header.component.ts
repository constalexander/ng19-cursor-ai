import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  template: `
    <div class="px-6 py-4 border-b border-gray-700" [class]="class">
      <ng-content select="[title]"></ng-content>
      <ng-content select="[subtitle]"></ng-content>
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() class = '';
}
