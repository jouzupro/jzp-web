import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ct',
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  styleUrl: './custom-typography.component.css',
})
export class CustomTypographyComponent implements OnInit {
  /// Typography Sets
  // h = 'Header'
  // t = 'Title'
  // k = 'Kanji'
  // ft = 'Form Title'
  // ch = 'Content Header'
  // n = 'Name'
  // nt = 'Note'
  @Input({ alias: 'level' }) levelText: number = 0;
  @Input() size: '' | 'h' | 't' | 'k' | 'ft' | 'ch' | 'n' | 'nt' = '';
  @Input() color: 'primary' | 'secondary' | 'gray' | 'white' = 'gray';
  @Input() class = '';

  @HostBinding('class') classes: string = '';

  ngOnInit(): void {
    this.updateClasses();
  }

  private updateClasses() {
    let sizeClass = '';
    switch (this.size) {
      case 'h':
        sizeClass = 'text-4xl font-bold';
        break;
      case 't':
        sizeClass = 'text-3xl font-semibold';
        break;
      case 'n':
        sizeClass = 'text-2xl font-semibold';
        break;
      case 'ft':
        sizeClass = 'text-xl font-semibold';
        break;
      case 'ch':
        sizeClass = 'text-lg font-semibold';
        break;
      case 'k':
        sizeClass = 'text-9xl';
        break;
      case 'nt':
        sizeClass = 'text-sm font-thin';
        break;
      case '':
      default:
        sizeClass = 'text-base';
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
      colorClass = 'text-white';
    }

    this.classes = `${this.class} ${sizeClass} ${colorClass}`;
  }
}
