import { Component } from '@angular/core';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { CommonModule } from '@angular/common';
import { ClassNameToTextPipe } from '../../pipes/classname-to-text/class-name-to-text.pipe';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { HeatmapMonthComponent } from '../../components/heatmap-month/heatmap.component';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import dummy from '../../../assets/json/dummies.json';

@Component({
  selector: 'app-profile',
  imports: [
    CustomTypographyComponent,
    CommonModule,
    ClassNameToTextPipe,
    ExpansionPanelComponent,
    HeatmapMonthComponent,
    KanjiBoxComponent,
    ButtonComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  data = dummy[0];
  profileData = this.data.profile.userStat;
  profileName = this.data.profile.name;
  jlptData = this.data.profile.jlpt;
  historyList = this.data.dashboard.historyList;
  criticalKanji = this.data.profile.criticalKanji;
  listKanji = this.data.profile.progressKanji;
  listKanjiLocked = this.data.profile.kanjiLocked;
  progressDone = this.data.dashboard.progress.totalItemDone;
  totalProgress = this.data.dashboard.progress.totalItem;
  heatMapStat = this.data.profile.heatmapStats;
  constructor(private router: Router) {}

  calculatePercentage(value: string): number {
    const [current, total] = value.split('/').map(Number);
    return (current / total) * 100;
  }

  onSeeMore() {
    this.router.navigate(['materials']);
  }
}
