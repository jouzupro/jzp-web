import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'vocab-box',
  imports: [CommonModule, DividerComponent],
  template: `
    <div
      class="w-full rounded-md p-4 flex flex-col relative"
      [class.bg-gray-400]="type === 'locked'"
      [class.bg-green-500]="type === '' || type === 'learned'"
      [class.bg-blue-500]="type === 'unlearned' || type === 'unlocked'"
      [class.border-red-500]="status < 50"
      [class.border]="status < 50"
    >
      <div
        *ngIf="status < 50"
        class="absolute top-2 right-2 bg-red-500 text-red-900 text-xs font-semibold rounded-full px-2 py-1 z-10"
      >
        {{ status }}%
      </div>
      <div
        *ngIf="type === 'unlocked'"
        class="absolute top-2 right-2 bg-yellow-500 text-yellow-900 text-xs font-semibold rounded-full px-2 py-1 z-10"
      >
        Baru
      </div>
      <div
        *ngIf="type === 'locked'"
        class="absolute top-2 right-2 bg-gray-500 text-white text-xs font-semibold rounded-full px-2 py-1 z-10"
      >
        Terkunci
      </div>
      <div
        class="text-white"
        [class.text-5xl]="!isMinimize"
        [class.text-2xl]="isMinimize"
      >
        <ng-content></ng-content>
      </div>
      <div
        *ngIf="type === 'locked'"
        class="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-75 flex justify-center items-center rounded-md"
      ></div>

      <divider *ngIf="!isMinimize" full class="my-2" />
      <div *ngIf="!isMinimize">
        <div *ngIf="hiragana != ''" class="text-sm text-white">
          {{ hiragana }}
        </div>
        <div *ngIf="meaning != ''" class="text-sm text-white">
          {{ meaning }}
        </div>
      </div>
    </div>
  `,
  styleUrl: './vocab-box.component.css',
})
export class VocabBoxComponent {
  @Input() hiragana: string = '';
  @Input() meaning: string = '';
  @Input() type: string = '';
  @Input() status: number = 100;
  @Input() isMinimize: boolean = false;
}
