import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mnemonic',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngFor="let word of words; let i = index" class="text-base/7">
      <ng-container *ngIf="isReading(word); else regularWord">
        <span *ngFor="let part of splitWord(word)">
          <span
            [ngClass]="
              part.highlight
                ? 'pt-[2px] pl-1 pb-[2px] mr-1 rounded-md bg-gray-400 text-white'
                : ''
            "
          >
            {{ part.text }}
          </span>
        </span>
      </ng-container>
      <ng-template #regularWord>
        <span
          [ngClass]="
            isRadical(word)
              ? 'pt-[2px] pl-1 pb-[2px] mr-1 rounded-md bg-cyan-400'
              : isKanji(word)
              ? 'pt-[2px] pl-1 pb-[2px] mr-1 rounded-md bg-green-400'
              : isMeaning(word)
              ? 'pt-[2px] pl-1 pb-[2px] mr-1 rounded-md bg-pink-400'
              : ''
          "
          [ngStyle]="{
            color:
              isRadical(word) || isKanji(word) || isMeaning(word)
                ? 'white'
                : 'black'
          }"
        >
          {{ word }}
        </span>
      </ng-template>
    </span>
  `,
})
export class MnemonicWrapperComponent implements OnInit {
  @Input() mnemonic: string = '';
  @Input() keyRadical: string[] = [];
  @Input() keyKanji: string[] = [];
  @Input() keyReading: string[] = [];
  @Input() keyMeaning: string[] = [];

  words: string[] = [];

  ngOnInit(): void {
    this.words = this.mnemonic.split(/\s+/);
  }

  splitWord(word: string): { text: string; highlight: boolean }[] {
    const reading = this.keyReading.find((r) =>
      word.toLowerCase().includes(r.toLowerCase())
    );
    if (!reading) {
      return [{ text: word, highlight: false }];
    }

    const parts: { text: string; highlight: boolean }[] = [];
    let lowerCaseWord = word.toLowerCase();
    let index = lowerCaseWord.indexOf(reading.toLowerCase());
    let remaining = word;

    while (index !== -1) {
      parts.push({ text: remaining.substring(0, index), highlight: false });
      parts.push({
        text: word.substring(index, index + reading.length),
        highlight: true,
      });
      remaining = remaining.substring(index + reading.length);
      lowerCaseWord = remaining.toLowerCase();
      index = lowerCaseWord.indexOf(reading.toLowerCase());
    }

    parts.push({ text: remaining, highlight: false });
    return parts;
  }

  isRadical(word: string): boolean {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
    return this.keyRadical
      .map((x) => x.toLowerCase())
      .includes(cleanWord.toLowerCase());
  }

  isMeaning(word: string): boolean {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
    return this.keyMeaning
      .map((x) => x.toLowerCase())
      .includes(cleanWord.toLowerCase());
  }

  isKanji(word: string): boolean {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
    return this.keyKanji
      .map((x) => x.toLowerCase())
      .includes(cleanWord.toLowerCase());
  }

  isReading(word: string): boolean {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
    return this.keyReading.some((r) =>
      cleanWord.toLowerCase().includes(r.toLowerCase())
    );
  }
}
