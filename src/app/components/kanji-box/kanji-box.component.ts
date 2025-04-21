import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kanji-box',
  imports: [CommonModule],
  template: `
    <div
      class="rounded-md p-4 flex flex-col items-center relative w-24"
      [class.bg-gray-400]="type === 'locked'"
      [class.bg-green-500]="type === '' || type === 'learned'"
      [class.bg-blue-500]="type === 'unlearned' || type === 'unlocked'"
      [class.border-red-500]="status < 50"
      [class.border]="status < 50"
    >
      <div *ngIf="!isMinimize">
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
      </div>
      <div
        class="text-white"
        [class.text-5xl]="!isMinimize"
        [class.text-2xl]="isMinimize"
      >
        <ng-content></ng-content>
      </div>
      <div *ngIf="!isMinimize" class="text-center">
        <div
          *ngIf="hiragana != ''"
          class="text-sm text-white overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ hiragana }}
        </div>
        <div
          *ngIf="meaning != ''"
          class="text-sm text-white overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ meaning }}
        </div>
      </div>
      <div
        *ngIf="type === 'locked'"
        class="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-75 flex justify-center items-center rounded-md"
      ></div>
    </div>
  `,
  styleUrl: './kanji-box.component.css',
})
export class KanjiBoxComponent {
  @Input() hiragana: string = '';
  @Input() meaning: string = '';
  @Input() type: string = '';
  @Input() status: number = 100;
  @Input() isMinimize: boolean = false;

  // You can also use HostBinding for more direct class manipulation if needed
  // @HostBinding('class.bg-green-500') get isDefaultOrLearned() {
  //   return this.type === '' || this.type === 'learned';
  // }

  // @HostBinding('class.bg-blue-500') get isUnlearned() {
  //   return this.type === 'unlearned';
  // }
}
