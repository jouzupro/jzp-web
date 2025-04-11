import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ct',
  imports: [CommonModule],
  template: `<div [ngClass]="classes">
    <ng-content></ng-content>
  </div>`,
  styleUrl: './custom-typography.component.css',
})
export class CustomTypographyComponent implements OnInit {
  @Input({ alias: 'level' }) levelText: number = 0;
  @Input() size: '' | 'header' | 'content' | 'sub-header' = '';
  @Input() color: 'primary' | 'secondary' | 'gray' | 'white' = 'gray';

  classes: string = '';

  ngOnInit(): void {
    this.updateClasses();
  }

  private updateClasses() {
    let sizeClass = '';
    switch (this.size) {
      case 'header':
        sizeClass = 'text-2xl font-bold md:text-3xl lg:text-4xl';
        break;
      case 'sub-header':
        sizeClass = 'text-xl font-semibold md:text-2xl';
        break;
      case 'content':
        sizeClass = 'text-base md:text-lg';
        break;
      default:
        sizeClass = 'text-sm md:text-md';
        break;
    }

    let colorClass = '';

    if (this.levelText === 0) {
      switch (this.color) {
        case 'primary':
          colorClass = 'text-blue-500';
          break;
        case 'secondary':
          colorClass = 'text-green-500';
          break;
        case 'gray':
          colorClass = 'text-gray-800';
          break;
        case 'white':
          colorClass = 'text-white';
          break;
        default:
          colorClass = 'text-gray-800';
          break;
      }
    } else {
      colorClass = 'text-white'
      // switch (this.levelText) {
      //   case 1:
      //     colorClass = 'text-sky-100';
      //     break;
      //   case 2:
      //     colorClass = 'text-green-100';
      //     break;
      //   case 3:
      //     colorClass = 'text-yellow-100';
      //     break;
      //   case 4:
      //     colorClass = 'text-orange-100';
      //     break;
      //   case 5:
      //     colorClass = 'text-rose-100';
      //     break;
      //   case 6:
      //     colorClass = 'text-white';
      //     break;

      //   default:
      //     break;
      // }
    }

    this.classes = `${sizeClass} ${colorClass}`;
  }
}
