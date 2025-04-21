import { Component, OnInit } from '@angular/core';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { StatusBoxComponent } from '../../components/status-box/status-box.component';
import { Router } from '@angular/router';
import dummy from '../../../assets/json/dummies.json';
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
  data = dummy[0];

  listKanji = this.data.dashboard.progressKanji;
  historyList = this.data.dashboard.historyList;
  statusList = this.data.dashboard.userStatus;
  lessonsAvailable = this.data.dashboard.totalLearnAvailable;
  reviewsAvailable = this.data.dashboard.totalReviewAvailable;
  progressDone = this.data.dashboard.progress.totalItemDone;
  totalProgress = this.data.dashboard.progress.totalItem;

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
    console.log('test');
    this.router.navigate(['play']);
  }
  getDetail(res: any) {
    this.router.navigate(['kanji-detail'], { queryParams: { id: '争' } });
  }
}
