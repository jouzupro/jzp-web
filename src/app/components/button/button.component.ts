import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'btn',
  imports: [MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  private _full: boolean = false;

  @Input()
  set full(value: boolean | string | null | undefined) {
    if (value === '' || value === true) {
      this._full = true;
    } else {
      this._full = false;
    }
  }
  get full(): boolean {
    return this._full;
  }
  @Input() onClick: (e?: any) => void = (e?: any) => {};
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variation: 'primary' | 'error' | 'danger' | 'secondary' | 'success' | 'white' =
    'primary'; // Added variation input
  @Output() customButtonClicked = new EventEmitter<any>();

  baseClass =
    'inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

  handleClick(e?: any) {
    this.customButtonClicked.emit(e);
    if (this.onClick) {
      this.onClick(e);
    }
  }
}
