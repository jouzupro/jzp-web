import { Component } from '@angular/core';

@Component({
  selector: 'kanji-box',
  imports: [],
  template: `<div class="border rounded-md p-4 bg-blue-200 text-5xl text-white">
    <ng-content></ng-content>
  </div>`,
  styleUrl: './kanji-box.component.css',
})
export class KanjiBoxComponent {}
