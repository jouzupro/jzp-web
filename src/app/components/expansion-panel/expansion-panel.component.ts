import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule, DividerComponent],
  template: `
    <div class=" bg-gray-500 rounded w-full mb-2">
      <button
        class="w-full p-4 flex justify-between items-center"
        (click)="togglePanel()"
      >
        <span class="text-white text-lg font-semibold">{{ title }}</span>
        <mat-icon
          class="transition-transform duration-300"
          [class.transform]="!isOpen"
          [class.-rotate-180]="isOpen"
          style="color: white;"
        >
          expand_more
        </mat-icon>
      </button>

      <div *ngIf="isOpen" [@slideInOut]="isOpen">
        <div class="px-4">
          <divider full/>
        </div>
        <div class="p-4 w-full overflow-hidden">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [],
  animations: [
    trigger('slideInOut', [
      state('void', style({ height: '0px', opacity: '0' })),
      transition(':enter', [
        animate('300ms ease-in-out', style({ height: '*', opacity: '1' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ height: '0px', opacity: '0' })),
      ]),
    ]),
  ],
})
export class ExpansionPanelComponent {
  @Input() title: string = 'Expansion Panel';
  isOpen: boolean = false;

  togglePanel() {
    this.isOpen = !this.isOpen;
  }
}
