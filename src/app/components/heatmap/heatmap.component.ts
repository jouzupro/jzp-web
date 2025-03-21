import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

interface ContributionData {
  date: string;
  contribution: number;
}

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col text-black w-full">
      <!-- Heatmap Title -->
      <h2 class="text-lg font-semibold mb-2">Activity Heatmap</h2>
      <!-- Month Indicators -->
      <div class="flex w-full ml-15">
        <div class="flex justify-between items-center gap-13">
          <span
            *ngFor="let month of months"
            class="text-xs text-gray-500 flex-grow text-center"
          >
            {{ month }}
          </span>
        </div>
      </div>

      <!-- Heatmap Grid -->
      <div class="flex overflow-x-auto w-full mt-2">
        <div
          class="grid gap-1 w-full"
          style="grid-template-columns: 40px repeat(53, 12px);"
        >
          <!-- Day Labels -->
          <div class="flex flex-col justify-around">
            <span
              *ngFor="let day of days; let i = index"
              class="text-xs text-gray-500"
            >
              {{ getDayAbbreviation(i) }}
            </span>
          </div>

          <!-- Contribution Cells -->
          <div *ngFor="let week of weeks" class="flex flex-col">
            <div
              *ngFor="let day of days; let i = index"
              class="w-3 h-3 rounded-sm m-0.5 relative cursor-pointer"
              [ngClass]="getCellColor(week, day)"
              (mouseenter)="showPopover(week, day, $event)"
              (mouseleave)="hidePopover()"
            ></div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="mt-2 flex items-center ml-15">
        <span class="text-sm mr-2">Less</span>
        <div class="w-4 h-4 bg-green-100 mr-1"></div>
        <div class="w-4 h-4 bg-green-300 mr-1"></div>
        <div class="w-4 h-4 bg-green-500 mr-1"></div>
        <div class="w-4 h-4 bg-green-700 mr-1"></div>
        <span class="text-sm ml-1">More</span>
      </div>

      <!-- Popover -->
      <div
        *ngIf="popover.show"
        class="fixed bg-gray-100 border border-gray-300 rounded shadow-md p-2 text-sm z-50 ml-5"
        [style.left.px]="popover.x"
        [style.top.px]="popover.y"
        style="min-width: 150px;"
      >
        <div
          *ngIf="
            getContribution(popover.week, popover.day) !== 0;
            else noContribution
          "
        >
          <p>{{ getFormattedDate(popover.week, popover.day) }}</p>
          <p>{{ getContribution(popover.week, popover.day) }} contributions</p>
        </div>
        <ng-template #noContribution>
          No contribution on
          {{ getFormattedDate(popover.week, popover.day) }}</ng-template
        >
      </div>
    </div>
  `,
  styleUrl: './heatmap.component.css',
})
export class HeatmapComponent implements OnInit {
  data: ContributionData[] = [
    { date: '23 Jan 2025', contribution: 30 },
    { date: '12 Feb 2025', contribution: 12 },
    { date: '01 Jan 2025', contribution: 5 },
    { date: '15 Mar 2025', contribution: 20 },
    { date: '28 Apr 2025', contribution: 8 },
    { date: '10 May 2025', contribution: 35 },
    { date: '05 Jun 2025', contribution: 15 },
    { date: '18 Jul 2025', contribution: 25 },
    { date: '02 Aug 2025', contribution: 10 },
    { date: '20 Sep 2025', contribution: 40 },
    { date: '11 Oct 2025', contribution: 3 },
    { date: '30 Nov 2025', contribution: 18 },
    { date: '25 Dec 2025', contribution: 22 },
  ];

  contributionsMap: { [week: number]: { [day: number]: number } } = {};
  year: number = 2025;
  weeks: number[] = Array.from({ length: 53 }, (_, i) => i + 1);
  days: number[] = Array.from({ length: 7 }, (_, i) => i);
  heatmapWidth: number = 53 * 12;
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  popover = {
    show: false,
    week: 0,
    day: 0,
    x: 0,
    y: 0,
  };

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    this.data.forEach((item) => {
      const date = dayjs(item.date, 'DD MMM YYYY');
      if (date.year() === this.year) {
        const week = date.week();
        const day = date.day();
        if (!this.contributionsMap[week]) {
          this.contributionsMap[week] = {};
        }
        this.contributionsMap[week][day] = item.contribution;
      }
    });
  }

  getCellColor(week: number, day: number): string {
    const contribution = this.contributionsMap[week]?.[day] || 0;

    if (contribution > 30) {
      return 'bg-green-700';
    } else if (contribution > 20) {
      return 'bg-green-500';
    } else if (contribution > 10) {
      return 'bg-green-300';
    } else if (contribution > 0) {
      return 'bg-green-100';
    } else {
      return 'bg-gray-100';
    }
  }

  getContribution(week: number, day: number): number {
    return this.contributionsMap[week]?.[day] || 0;
  }

  getFormattedDate(week: number, day: number): string {
    const date = dayjs().year(this.year).week(week).day(day);
    return date.format('DD MMM YYYY');
  }

  showPopover(week: number, day: number, event: MouseEvent): void {
    this.popover = {
      show: true,
      week: week,
      day: day,
      x: event.clientX,
      y: event.clientY,
    };
  }

  hidePopover(): void {
    this.popover.show = false;
  }

  getDayAbbreviation(dayIndex: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  }
}
