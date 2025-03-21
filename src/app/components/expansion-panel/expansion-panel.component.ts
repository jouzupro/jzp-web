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

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="border rounded w-full">
      <button
        class="w-full p-4 flex justify-between items-center"
        (click)="togglePanel()"
      >
        <span class="text-black text-lg font-semibold">{{ title }}</span>
        <mat-icon
          class="transition-transform duration-300 text-black"
          [class.transform]="!isOpen"
          [class.-rotate-180]="isOpen"
        >
          expand_more
        </mat-icon>
      </button>

      <div
        *ngIf="isOpen"
        [@slideInOut]="isOpen"
        class="p-4 border-t w-full overflow-hidden"
      >
        <ng-content></ng-content>
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