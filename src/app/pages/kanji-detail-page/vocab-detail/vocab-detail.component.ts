import {
  Component,
  Input,
  NgZone,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CustomTypographyComponent } from '../../../components/custom-typography/custom-typography.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IBaseVocabulary } from '../../../constant/types';
import { MnemonicWrapperComponent } from '../../../components/mnemonic-wrapper/mnemonic-wrapper.component';
import { HiraganaToRomajiPipe } from '../../../pipes/hiragana-to-romaji/hiragana-to-romaji.pipe';

import { MatExpansionModule } from '@angular/material/expansion';
import { KanjiBoxComponent } from '../../../components/kanji-box/kanji-box.component';
import { Route } from '@angular/router';
import { FooterKanjiComponent } from '../footer-kanji/footer-kanji.component';

@Component({
  selector: 'vc-detail',
  imports: [
    CustomTypographyComponent,
    DividerComponent,
    CommonModule,
    MatIconModule,
    MnemonicWrapperComponent,
    HiraganaToRomajiPipe,
    MatExpansionModule,
    KanjiBoxComponent,
    FooterKanjiComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex justify-center">
      <div class="border rounded-md p-4 w-fit">
        <ct size="k">{{ data.char }}</ct>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Arti</ct>
      <div class="my-3">
        <divider />
      </div>
      <ct>{{ data.meaning }}</ct>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Penjelasan Artian</ct>
      <div class="my-3">
        <divider />
      </div>
      <mnemonic
        [mnemonic]="data.meaningData.mnemonic"
        [keyKanji]="data.keyKanji"
        [keyMeaning]="[data.meaning]"
      />
      <div
        *ngIf="data.meaningData.hint != ''"
        class="p-3 bg-blue-500 rounded-md mt-3 text-white"
      >
        <div class="flex items-center">
          <mat-icon
            aria-label="Example home icon"
            class="p-0"
            fontIcon="info"
            style="
      color: white;
      font-size: medium;
      display: flex;
      align-items: center;
    "
          ></mat-icon>
          <ct size="ch" color="white">Hint</ct>
        </div>
        {{ data.meaningData.hint }}
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Cara Membaca</ct>
      <div class="my-3">
        <divider />
      </div>
      <div
        class="relative bg-gray-100 rounded-md p-3 flex space-x-4 my-3 items-start"
      >
        <mat-icon
          *ngIf="voicesLoaded"
          aria-hidden="false"
          (click)="onListen(data.hiragana)"
          aria-label="Example home icon"
          [fontIcon]="isSpeaking ? 'volume_up' : 'volume_mute'"
          style="color: black"
        ></mat-icon>
        <div class="flex flex-col">
          <ct size="ch">{{ data.hiragana }}</ct>
          <ct size="nt">{{ data.hiragana | hiraganaToRomaji }}</ct>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Penjelasan Membaca</ct>
      <div class="my-3">
        <divider />
      </div>
      <mnemonic
        [mnemonic]="data.readingData.mnemonic"
        [keyKanji]="data.keyKanji"
        [keyMeaning]="[data.meaning]"
      />
      <div
        *ngIf="data.meaningData.hint != ''"
        class="p-3 bg-blue-500 rounded-md mt-3 text-white"
      >
        <div class="flex items-center">
          <mat-icon
            aria-label="Example home icon"
            class="p-0"
            fontIcon="info"
            style="
      color: white;
      font-size: medium;
      display: flex;
      align-items: center;
    "
          ></mat-icon>
          <ct size="ch" color="white">Hint</ct>
        </div>
        {{ data.readingData.hint }}
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Contoh Pola Penggunaan</ct>

      <div class="my-3">
        <divider />
      </div>
      <mat-accordion>
        <mat-expansion-panel *ngFor="let pola of data.pattern">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <div class="flex flex-col">
                {{ pola.word }}
              </div>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <div class="ml-3">
            <div
              class="relative bg-gray-100 rounded-md p-3 flex space-x-4 my-3 items-start"
            >
              <mat-icon
                *ngIf="voicesLoaded"
                aria-hidden="false"
                (click)="onListen(pola.word)"
                aria-label="Example home icon"
                [fontIcon]="isSpeaking ? 'volume_up' : 'volume_mute'"
                style="color: black"
              ></mat-icon>
              <div class="flex flex-col">
                <ct size="ch">{{ kanjiToHiraganaSimplify(pola.word) }}</ct>
                <ct size="nt">{{ data.hiragana | hiraganaToRomaji }}</ct>
              </div>
            </div>
            <ct size="ch">Contoh kalimat</ct>
            <div
              *ngFor="let example of pola.examples; let i = index"
              class="relative bg-gray-100 rounded-md p-3 flex space-x-4 my-3 items-start"
            >
              <mat-icon
                *ngIf="voicesLoaded"
                aria-hidden="false"
                (click)="onListen(example.word)"
                aria-label="Example home icon"
                [fontIcon]="isSpeaking ? 'volume_up' : 'volume_mute'"
                style="color: black"
              ></mat-icon>
              <div class="flex flex-col">
                <ct size="ch">{{ example.word }}</ct>
                <ct size="nt">{{ example.meaning }}</ct>
              </div>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Contoh Kalimat</ct>

      <div class="my-3">
        <divider />
      </div>

      <div
        *ngFor="let example of data.sentence; let i = index"
        class="relative bg-gray-100 rounded-md p-3 flex space-x-4 my-3 items-start"
      >
        <div>
          <mat-icon
            *ngIf="voicesLoaded"
            aria-hidden="false"
            (click)="onListen(example.word)"
            aria-label="Example home icon"
            [fontIcon]="isSpeaking ? 'volume_up' : 'volume_mute'"
            style="color: black"
          ></mat-icon>
        </div>
        <div class="flex flex-col">
          <ct size="ch">{{ example.word }}</ct>
          <ct size="nt">{{ example.meaning }}</ct>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Komposisi Kanji</ct>

      <div class="my-3">
        <divider />
      </div>

      <div class="flex flex-wrap gap-4 my-3">
        <kanji-box
          *ngFor="let k of data.kanjiComposition; let i = index"
          [hiragana]="k.hiragana"
          [meaning]="k.meaning"
          (click)="goTo(k.char)"
          >{{ k.char }}</kanji-box
        >
      </div>
    </div>
    <fk></fk>`,
})
export class VocabDetailComponent {
  readonly panelOpenState = signal(false);
  @Input()
  data!: IBaseVocabulary;
  @Input()
  goTo!: (char: string) => void;
  // text to speech related
  speechSynthesis!: globalThis.SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  voicesLoaded: boolean = false;
  isSpeaking: boolean = false;

  constructor(private ngZone: NgZone) {}

  kanjiToHiraganaSimplify(word: string) {
    let result = word.replace(this.data.char, this.data.hiragana);
    result = result.replace('〜', '');
    return result;
  }

  ngOnInit(): void {
    if ('speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;

      this.speechSynthesis.onvoiceschanged = () => {
        this.voices = this.speechSynthesis.getVoices();
        this.voicesLoaded = true;
        // console.log('Voices loaded:', this.voices);
      };

      this.voices = this.speechSynthesis.getVoices();
      this.voicesLoaded = this.voices.length > 0;

      if (!this.voicesLoaded) {
        console.warn(
          'Voices not immediately available, waiting for voiceschanged event.'
        );
      }
    }
  }

  onListen(str: string) {
    if (this.voicesLoaded && str != '') {
      const message = str;
      let utterance = new SpeechSynthesisUtterance(message);
      const voice = this.voices.find((voice) => voice.lang === 'ja-JP');
      utterance.voice = voice ? voice : null;
      utterance.pitch = 1.5;
      utterance.rate = 0.8;
      utterance.volume = 1;
      this.isSpeaking = true;

      utterance.onend = () => {
        this.ngZone.run(() => {
          this.isSpeaking = false;
        });
      };

      this.speechSynthesis.speak(utterance);
    } else {
      console.error('speech synth not supported or voices not loaded yet');
    }
  }
}
