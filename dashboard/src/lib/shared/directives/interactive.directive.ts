import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Directive({
  selector: '[appInteractive]',
  standalone: true,
  hostDirectives: [NgClass],
})
export class InteractiveDirective {
  private isHovered = signal(false);
  private isFocused = signal(false);

  @Input() hoverClass = 'hover:bg-accent/5';
  @Input() focusClass = 'ring-2 ring-accent/20';
  @Output() interactionStateChange = new EventEmitter<{ hovered: boolean; focused: boolean }>();

  constructor(private el: ElementRef, private ngClass: NgClass) {
    // Reactive update of classes based on state
    this.updateClasses();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered.set(true);
    this.emitState();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered.set(false);
    this.emitState();
  }

  @HostListener('focus')
  onFocus() {
    this.isFocused.set(true);
    this.emitState();
  }

  @HostListener('blur')
  onBlur() {
    this.isFocused.set(false);
    this.emitState();
  }

  private updateClasses() {
    // Compute classes based on state
    const classes = {
      [this.hoverClass]: this.isHovered(),
      [this.focusClass]: this.isFocused(),
    };
    this.ngClass.ngClass = classes;
  }

  private emitState() {
    this.updateClasses();
    this.interactionStateChange.emit({
      hovered: this.isHovered(),
      focused: this.isFocused(),
    });
  }
}
