import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class="bg-secondary rounded-lg overflow-hidden h-full flex flex-col" [class]="class">
      <ng-content select="[header]"></ng-content>
      <div class="flex-1">
        <ng-content></ng-content>
      </div>
      <ng-content select="[footer]"></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() class = '';
}
