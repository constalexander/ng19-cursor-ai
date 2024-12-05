import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  template: `
    <div class="px-6 py-4 border-t border-gray-700" [class]="class">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent {
  @Input() class = '';
}
