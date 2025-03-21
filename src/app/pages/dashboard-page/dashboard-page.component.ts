import { Component, OnInit } from '@angular/core';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { HeatmapComponent } from '../../components/heatmap/heatmap.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CustomTypographyComponent,
    MatIconModule,
    ExpansionPanelComponent,
    KanjiBoxComponent,
    HeatmapComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
}
