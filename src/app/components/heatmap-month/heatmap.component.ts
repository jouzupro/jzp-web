import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';

interface ContributionData {
  date: string;
  contribution: number;
}

@Component({
  selector: 'month-heatmap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col text-black w-full">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-lg font-semibold">
          Activity Heatmap - 
        </h2>

        <select
          [(ngModel)]="selectedMonth"
          (change)="onMonthChange()"
          class="p-2 border rounded"
        >
          <option *ngFor="let month of monthOptions" [value]="month.value">
            {{ month.label }}
          </option>
        </select>
      </div>

      <div class="grid gap-1" style="grid-template-columns: repeat(7, 30px);">
        <div *ngFor="let dayName of dayNames" class="flex flex-col">
          <div class="w-6 h-4 text-xs text-center">{{ dayName }}</div>
        </div>
      </div>

      <div class="grid gap-1" style="grid-template-columns: repeat(7, 30px);">
        <div
          *ngFor="let day of daysWithOffset; let i = index"
          class="flex flex-col"
        >
          <div
            class="w-6 h-6 rounded-sm m-0.5 relative cursor-pointer"
            [ngClass]="getCellColor(day)"
            (mouseenter)="showPopover(day, $event)"
            (mouseleave)="hidePopover()"
            *ngIf="day !== null"
          ></div>
          <div class="w-6 h-6 rounded-sm m-0.5" *ngIf="day === null"></div>
        </div>
      </div>

      <div class="flex items-center mt-2">
        <div class="mr-2">Less</div>
        <div class="w-4 h-4 bg-gray-100 border-gray-100 rounded mr-1"></div>
        <div class="w-4 h-4 bg-green-100 border-gray-100 rounded mr-1"></div>
        <div class="w-4 h-4 bg-green-300 border-gray-100 rounded mr-1"></div>
        <div class="w-4 h-4 bg-green-500 border-gray-100 rounded mr-1"></div>
        <div class="w-4 h-4 bg-green-700 border-gray-100 rounded mr-1"></div>
        <div>More</div>
      </div>

      <div
        *ngIf="popover.show"
        class="fixed bg-gray-100 border border-gray-300 rounded shadow-md p-2 text-sm z-50 ml-5"
        [style.left.px]="popover.x"
        [style.top.px]="popover.y"
        style="min-width: 150px;"
      >
        <p>{{ getFormattedDate(popover.day) }}</p>
        <p>{{ getContribution(popover.day) }} contributions</p>
      </div>
    </div>
  `,
  styleUrl: './heatmap.component.css',
})
export class HeatmapMonthComponent implements OnInit {
  data: ContributionData[] = [
    {
      date: '3 Dec 2024',
      contribution: 10,
    },
    {
      date: '10 Apr 2025',
      contribution: 35,
    },
    {
      date: '4 Jan 2024',
      contribution: 10,
    },
    {
      date: '10 Jan 2024',
      contribution: 10,
    },
  ];
  currentDate = dayjs();
  monthName = this.currentDate.format('MMMM YYYY');
  daysInMonth: number[] = [];
  contributions: { [day: number]: number } = {};
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysWithOffset: (number | null)[] = [];
  firstDayOfMonth: number = 0;

  selectedMonth: string = '';
  monthOptions: { value: string; label: string }[] = [];

  popover = {
    show: false,
    day: 0,
    x: 0,
    y: 0,
  };

  ngOnInit(): void {
    this.generateMonthOptions();
    if (this.monthOptions.length > 0) {
      this.selectedMonth = this.monthOptions[0].value;
      this.onMonthChange();
    }
  }

  generateMonthOptions(): void {
    const months = new Set<string>();

    this.data.forEach((item) => {
      const date = dayjs(item.date, 'DD MMM YYYY').format('YYYY-MM');
      months.add(date);
    });

    this.monthOptions = Array.from(months)
      .sort()
      .map((month) => ({
        value: month,
        label: dayjs(month + '-01').format('MMMM YYYY'),
      }));
  }

  onMonthChange(): void {
    this.currentDate = dayjs(this.selectedMonth + '-01');
    this.monthName = this.currentDate.format('MMMM YYYY');
    this.generateDaysInMonth();
    this.fetchContributions();
    this.calculateOffset();
  }

  calculateOffset(): void {
    this.firstDayOfMonth = this.currentDate.startOf('month').day();
    this.daysWithOffset = Array(this.firstDayOfMonth).fill(null).concat(this.daysInMonth);
  }

  generateDaysInMonth(): void {
    const daysInMonthCount = this.currentDate.daysInMonth();
    this.daysInMonth = Array.from(
      { length: daysInMonthCount },
      (_, i) => i + 1
    );
  }

  fetchContributions(): void {
    this.contributions = {};
    this.data.forEach((item) => {
      const date = dayjs(item.date, 'DD MMM YYYY');
      if (date.format('YYYY-MM') === this.selectedMonth) {
        this.contributions[date.date()] = item.contribution;
      }
    });
  }

  getCellColor(day: number | null): string {
    if (day === null) {
      return 'bg-gray-50';
    }
    const contribution = this.contributions[day] || 0;

    if (contribution > 25) {
      return 'bg-green-700';
    } else if (contribution > 15) {
      return 'bg-green-500';
    } else if (contribution > 5) {
      return 'bg-green-300';
    } else if (contribution > 0) {
      return 'bg-green-100';
    } else {
      return 'bg-gray-100';
    }
  }

  getContribution(day: number): number {
    return this.contributions[day] || 0;
  }

  getFormattedDate(day: number): string {
    return dayjs()
      .year(this.currentDate.year())
      .month(this.currentDate.month())
      .date(day)
      .format('DD MMM YYYY');
  }

  showPopover(day: number | null, event: MouseEvent): void {
    if (day === null) {
      return;
    }

    this.popover = {
      show: true,
      day: day,
      x: event.clientX,
      y: event.clientY,
    };
  }

  hidePopover(): void {
    this.popover.show = false;
  }
}
