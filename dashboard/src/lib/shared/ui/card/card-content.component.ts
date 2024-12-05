import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-content',
  template: `
    <div class="p-6" [class]="class">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent {
  @Input() class = '';
}
