import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="{'mx-4': full}" class="border-b border-gray-200"></div>
  `,
})
export class DividerComponent {
  private _full: boolean = false;
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
}
