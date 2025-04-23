import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogWrapperComponent } from '../../components/dialog-wrapper/dialog-wrapper.component';
import { VocabBoxComponent } from '../../components/vocab-box/vocab-box.component';
import { IFilterKanji } from '../../constant/types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kanji-pages',
  imports: [
    ButtonComponent,
    CustomTypographyComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    KanjiBoxComponent,
    CommonModule,
    VocabBoxComponent,
  ],
  templateUrl: './kanji-pages.component.html',
  styleUrl: './kanji-pages.component.css',
})
export class KanjiPagesComponent {
  readonly dialog = inject(MatDialog);
  payload: IFilterKanji = {
    selectedFilterBy: 'level',
    isMaximized: false,
    selectedParam: '1',
  };
  listVocab = [
    {
      char: '上',
      hiragana: 'うえ',
      meaning: 'Diatas',
      type: 'learned',
    },
    {
      char: '人工',
      hiragana: 'じんこう',
      meaning: 'Buatan',
      type: 'learned',
    },
    {
      char: '先生',
      hiragana: 'せんせい',
      meaning: 'Guru',
      type: 'learned',
    },
    {
      char: '会社',
      hiragana: 'かいしゃ',
      meaning: 'Perusahaan',
      type: 'unlearned',
    },
    {
      char: '学校',
      hiragana: 'がっこう',
      meaning: 'Sekolah',
      type: 'unlocked',
    },
  ];
  listRadicals = [
    {
      char: '亅',
      meaning: 'barb',
      type: 'learned',
      id: 'r1',
    },
    {
      char: '丶',
      meaning: 'dot',
      type: 'learned',
      id: 'r1',
    },
    {
      char: '丿',
      meaning: 'slash',
      type: 'learned',
      id: 'r1',
    },
    {
      char: '乙',
      meaning: 'second',
      type: 'learned',
      id: 'r1',
    },
    {
      char: '一',
      meaning: 'one',
      type: 'learned',
      id: 'r1',
    },
  ];
  listKanji = [
    {
      char: '川',
      hiragana: 'かわ',
      meaning: 'Sungai',
      type: 'learned',
    },
    {
      char: '山',
      hiragana: 'やま',
      meaning: 'Gunung',
      type: 'learned',
    },
    {
      char: '木',
      hiragana: 'き',
      meaning: 'Pohon',
      type: 'unlearned',
    },
    {
      char: '火',
      hiragana: 'ひ',
      meaning: 'Api',
      type: 'unlearned',
    },
    {
      char: '水',
      hiragana: 'みず',
      meaning: 'Air',
      type: 'unlocked',
    },
  ];

  constructor(private router: Router) {}

  openFilter() {
    const dialogRef = this.dialog.open(DialogWrapperComponent);

    dialogRef.afterClosed().subscribe((result: IFilterKanji) => {
      this.payload = result;
      console.log(result);
    });
  }
  openPractice() {
    this.router.navigate(['start-practice']);
  }

  getDetail(res: any) {
    this.router.navigate(['kanji-detail'], { queryParams: { id: res } });
  }
}
