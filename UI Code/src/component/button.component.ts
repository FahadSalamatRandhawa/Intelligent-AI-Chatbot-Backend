import { Component, Output, EventEmitter } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'Button',
  standalone: true,
  imports: [HlmButtonDirective],
  template: `
    <button hlmBtn class="bg-[#A53412] hover:bg-[#A53412]/90 w-full rounded-none" (click)="handleClick()">
      <ng-content></ng-content> <!-- Projects child content -->
    </button>
  `,
})
export class Button {
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  handleClick() {
    this.onClick.emit(); // Emit the click event to the parent component
  }
}
