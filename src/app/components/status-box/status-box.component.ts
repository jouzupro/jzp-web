import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { CustomTypographyComponent } from '../custom-typography/custom-typography.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'status-box',
  imports: [CustomTypographyComponent, DividerComponent],
  template: `
    <div class="rounded-md p-4 flex flex-col w-60" [class]="baseClass">
      <div class="flex justify-between mb-2">
        <ct size="sub-header" [level]="level">
          {{ statusName }}
        </ct>
        <ct size="sub-header" [level]="level">
          {{ totalItem }}
        </ct>
      </div>
      <div class="rounded w-full bg-white p-3 flex flex-col gap-2">
        <div class="flex flex-row justify-between">
          <ct> Radicals </ct>
          <ct> 20 </ct>
        </div>
        <divider />
        <div class="flex flex-row justify-between">
          <ct> Kanji </ct>
          <ct> 20 </ct>
        </div>
        <divider />
        <div class="flex flex-row justify-between">
          <ct> Vocabulary </ct>
          <ct> 20 </ct>
        </div>
        <divider />
      </div>
      <divider />
    </div>
  `,
})
export class StatusBoxComponent implements OnInit {
  @Input({ alias: 'level', transform: numberAttribute }) level: number = 0;
  @Input({ alias: 'total', transform: numberAttribute }) totalItem: string =
    '0';

  baseClass = '';
  textClass = '';
  ngOnInit(): void {
    this.baseClass = this.getStatusClass(this.level);
  }

  get statusName(): string {
    let text = '';
    switch (this.level) {
      case 1:
        text = 'Dasar';
        break;
      case 2:
        text = 'Pemula';
        break;
      case 3:
        text = 'Pegiat';
        break;
      case 4:
        text = 'Pembelajar';
        break;
      case 5:
        text = 'Mahir';
        break;
      case 6:
        text = 'Ahli';
        break;
      case 7:
        text = 'Lanjutan';
        break;
      default:
        break;
    }
    return text;
  }

  getStatusClass(level: number): string {
    let className = '';
    switch (level) {
      case 1:
        className = 'bg-sky-500';
        break;
      case 2:
        className = 'bg-green-500';
        break;
      case 3:
        className = 'bg-yellow-500';
        break;
      case 4:
        className = 'bg-orange-500';
        break;
      case 5:
        className = 'bg-rose-500';
        break;
      case 6:
        className = 'bg-purple-500';
        break;
      case 7:
        className = 'bg-gray-500';
        break;
      default:
        break;
    }
    return className;
  }
}
