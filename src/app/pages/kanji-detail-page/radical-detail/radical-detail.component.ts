import { Component, Input } from '@angular/core';
import { CustomTypographyComponent } from '../../../components/custom-typography/custom-typography.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KanjiBoxComponent } from '../../../components/kanji-box/kanji-box.component';
import { IBaseRadical } from '../../../constant/types';
import { MnemonicWrapperComponent } from '../../../components/mnemonic-wrapper/mnemonic-wrapper.component';

@Component({
  selector: 'rd-detail',
  imports: [
    CustomTypographyComponent,
    DividerComponent,
    CommonModule,
    MatIconModule,
    KanjiBoxComponent,
    MnemonicWrapperComponent,
  ],
  template: `<div class="flex justify-center">
      <div class="border rounded-md p-4 w-fit">
        <ct size="k">{{ data.char }}</ct>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Arti</ct>
      <div class="my-3">
        <divider />
      </div>
      <ct>{{ data.meaning }}</ct>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Mnemonic</ct>
      <div class="my-3">
        <divider />
      </div>
      <mnemonic [mnemonic]="data.mnemonic" [keyRadical]="[data.meaning]" />
      <div
        *ngIf="data.hint != ''"
        class="p-3 bg-blue-500 rounded-md mt-3 text-white"
      >
        <div class="flex items-center">
          <mat-icon
            aria-label="Example home icon"
            class="p-0"
            fontIcon="info"
            style="
      color: white;
      font-size: medium;
      display: flex;
      align-items: center;
    "
          ></mat-icon>
          <ct size="ch" color="white">Hint</ct>
        </div>
        {{ data.hint }}
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Ditemukan Dalam Kanji</ct>

      <div class="my-3">
        <divider />
      </div>

      <div class="flex flex-wrap gap-4 my-3">
        <kanji-box
          *ngFor="let k of data.foundIn; let i = index"
          [hiragana]="k.hiragana"
          [meaning]="k.meaning"
          (click)="goTo(k.char)"
          >{{ k.char }}</kanji-box
        >
      </div>
    </div>`,
})
export class RadicalDetailComponent {
  @Input()
  data!: IBaseRadical;
  @Input()
  goTo!: (char: string) => void;
}
