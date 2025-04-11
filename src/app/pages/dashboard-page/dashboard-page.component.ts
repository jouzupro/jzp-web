import { Component, OnInit } from '@angular/core';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { StatusBoxComponent } from '../../components/status-box/status-box.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CustomTypographyComponent,
    MatIconModule,
    ExpansionPanelComponent,
    KanjiBoxComponent,
    CommonModule,
    ButtonComponent,
    StatusBoxComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  isMobile: boolean = false;
  lessonsAvailable: number = 5;
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
      type: 'unlocked',
    },
    {
      char: '水',
      hiragana: 'みず',
      meaning: 'Air',
      type: 'locked',
    },
  ];
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  navigateToPlay() {
    console.log('test')
    this.router.navigate(['play']);
  }
}
