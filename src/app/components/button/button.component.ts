import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class CustomButtonComponent {
  @Input() onClick: (e?: any) => void = (e?: any) => {};
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variation: 'primary' | 'error' | 'danger' | 'secondary' | 'success' = 'primary'; // Added variation input
  @Output() customButtonClicked = new EventEmitter<any>();

  handleClick(e?: any) {
    this.customButtonClicked.emit(e);
    if (this.onClick) {
      this.onClick(e);
    }
  }
}
