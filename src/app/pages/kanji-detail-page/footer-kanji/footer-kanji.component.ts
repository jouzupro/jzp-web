import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fk',
  imports: [ButtonComponent, MatIconModule],
  template: `
    <div class="flex justify-between gap-x-4">
      <btn full>
        <div class="flex items-center gap-x-2">
          <mat-icon fontIcon="arrow_back" style="color: white;"></mat-icon>
          川
        </div>
      </btn>
      <btn full>
        <div class="flex items-center gap-x-2">
          金
          <mat-icon fontIcon="arrow_forward" style="color: white;"></mat-icon>
        </div>
      </btn>
    </div>
  `,
})
export class FooterKanjiComponent {}
