import { Component } from '@angular/core';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { CommonModule } from '@angular/common';
import { ClassNameToTextPipe } from '../../pipes/classname-to-text/class-name-to-text.pipe';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { HeatmapComponent } from '../../components/heatmap/heatmap.component';
import { HeatmapMonthComponent } from '../../components/heatmap-month/heatmap.component';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-profile',
  imports: [
    CustomTypographyComponent,
    CommonModule,
    ClassNameToTextPipe,
    ExpansionPanelComponent,
    HeatmapMonthComponent,
    KanjiBoxComponent,
    ButtonComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData = {
    level: 3,
    totalExp: 3234,
    daysStudied: 54,
    longestStreak: 100,
    totalLearned: 30,
    totalReviewed: 40,
    totalAccuracy: 54,
  };

  jlptData = {
    n1: '0/540',
    n2: '0/320',
    n3: '0/200',
    n4: '20/145',
    n5: '97/100',
  };
  historyList = [
    {
      date: 'Today',
      reviews: [{ date: '9pm', total: 24 }],
      learned: [
        { date: '8pm', total: 3 },
        { date: '10pm', total: 5 },
      ],
    },
    {
      date: 'Yesterday',
      reviews: [],
      learned: [
        { date: '8pm', total: 3 },
        { date: '10pm', total: 5 },
      ],
    },
  ];

  criticalKanji = [
    {
      char: '川',
      hiragana: 'かわ',
      meaning: 'Sungai',
      type: 'learned',
      status: 43,
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
  listKanjiLocked = [
    {
      char: '川',
      hiragana: 'かわ',
      meaning: 'Sungai',
      type: 'locked',
    },
    {
      char: '山',
      hiragana: 'やま',
      meaning: 'Gunung',
      type: 'locked',
    },
    {
      char: '木',
      hiragana: 'き',
      meaning: 'Pohon',
      type: 'locked',
    },
    {
      char: '火',
      hiragana: 'ひ',
      meaning: 'Api',
      type: 'locked',
    },
    {
      char: '水',
      hiragana: 'みず',
      meaning: 'Air',
      type: 'locked',
    },
  ];
  calculatePercentage(value: string): number {
    const [current, total] = value.split('/').map(Number);
    return (current / total) * 100;
  }
}
