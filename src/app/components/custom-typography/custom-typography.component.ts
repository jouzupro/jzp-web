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
  @Input() size: '' | 'header' | 'content' | 'sub-header' = '';
  @Input() color: 'primary' | 'secondary' | 'gray' = 'gray';

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
      default:
        colorClass = 'text-gray-800';
        break;
    }

    this.classes = `${sizeClass} ${colorClass}`;
  }
}
