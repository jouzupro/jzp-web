import { Component } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CustomTypographyComponent } from '../custom-typography/custom-typography.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClassNameToTextPipe } from '../../pipes/classname-to-text/class-name-to-text.pipe';
import { CommonModule } from '@angular/common';
import { IFilterKanji } from '../../constant/types';
@Component({
  selector: 'app-dialog-wrapper',
  imports: [
    MatDialogModule,
    MatButtonModule,
    CustomTypographyComponent,
    MatRadioModule,
    FormsModule,
    MatSlideToggleModule,
    CommonModule,
    ClassNameToTextPipe,
  ],
  templateUrl: './dialog-wrapper.component.html',
  styleUrl: './dialog-wrapper.component.css',
  styles: [
    `
      .mat-slide-toggle.mat-primary .mat-slide-toggle-thumb {
        background-color: red !important;
      }

      .mat-slide-toggle.mat-primary .mat-slide-toggle-track {
        background-color: rgba(255, 0, 0, 0.5) !important;
      }

      .mat-slide-toggle .mat-slide-toggle-thumb {
        background-color: gray !important;
      }

      .mat-slide-toggle .mat-slide-toggle-track {
        background-color: lightgray !important;
      }
    `,
  ],
})
export class DialogWrapperComponent {
  payload:IFilterKanji = {
    selectedFilterBy: 'level',
    isMaximized: false,
    selectedParam: '1',
  }
  optionParam: string[] = ['1', '2', '3'];
  optionDiff = [
    {
      value: 'a',
      label: '1 - 10',
    },
    {
      value: 'b',
      label: '11 - 21',
    },
    {
      value: 'c',
      label: '21 - 31',
    },
  ];
  types: string[] = ['level', 'radical', 'kanji', 'vocabulary'];
  onParamChange() {
    console.log('test')
  }
}
