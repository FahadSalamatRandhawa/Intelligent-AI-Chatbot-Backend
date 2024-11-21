import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone:true,
  imports:[CommonModule],
  template: `
    <div *ngIf="visible" class="popup">
      {{ message }}
    </div>
  `,
  styles: [
    `
      .popup {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        z-index: 1000;
      }
    `,
  ],
})
export class PopupComponent implements OnChanges {
  @Input() message: string = '';
  @Input() duration: number = 2000; // default to 2 seconds

  visible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.showPopup();
    }
  }

  private showPopup(): void {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
}
