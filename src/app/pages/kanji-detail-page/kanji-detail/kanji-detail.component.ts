import { Component, Input, NgZone, OnInit } from '@angular/core';
import { CustomTypographyComponent } from '../../../components/custom-typography/custom-typography.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KanjiBoxComponent } from '../../../components/kanji-box/kanji-box.component';
import { IBaseKanji } from '../../../constant/types';
import { VocabBoxComponent } from '../../../components/vocab-box/vocab-box.component';
import { HiraganaToRomajiPipe } from '../../../pipes/hiragana-to-romaji/hiragana-to-romaji.pipe';
import { MnemonicWrapperComponent } from '../../../components/mnemonic-wrapper/mnemonic-wrapper.component';
import { FooterKanjiComponent } from '../footer-kanji/footer-kanji.component';

@Component({
  selector: 'kj-detail',
  imports: [
    CustomTypographyComponent,
    DividerComponent,
    CommonModule,
    MatIconModule,
    KanjiBoxComponent,
    VocabBoxComponent,
    HiraganaToRomajiPipe,
    MnemonicWrapperComponent,
    FooterKanjiComponent,
  ],
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
      <div class="mb-3">
        <ct size="ch">Utama</ct>
        <br />
        <ct>{{ data.meaning }}</ct>
      </div>
      <div>
        <ct size="ch">Sekunder</ct>
        <br />
        <ct *ngFor="let c of data.alternativeMeaning">{{ c }}</ct>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Mnemonic Artian</ct>
      <div class="my-3">
        <divider />
      </div>
      <mnemonic
        [mnemonic]="data.meaningData.mnemonic"
        [keyKanji]="data.keyKanji"
        [keyRadical]="data.keyRadical"
        [keyReading]="data.keyReading"
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
      <ct size="ch">Onyomi</ct>
      <div
        *ngFor="let on of data.reading.onyomi; let i = index"
        [class.border]="on === data.hiragana"
        class="relative bg-gray-100 rounded-md p-3 flex space-x-4 my-3 items-start"
      >
        <div
          *ngIf="on === data.hiragana"
          class="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-1 z-10"
        >
          Utama
        </div>
        <mat-icon
          *ngIf="voicesLoaded"
          aria-hidden="false"
          (click)="onListen(on, i)"
          aria-label="Example home icon"
          [fontIcon]="i === speakingIndex ? 'volume_up' : 'volume_mute'"
          style="color: black"
        ></mat-icon>
        <div class="flex flex-col">
          <ct size="ch">{{ on }}</ct>
          <ct size="nt">{{ on | hiraganaToRomaji }}</ct>
        </div>
      </div>
      <ct size="ch">Kunyomi</ct>

      <div
        *ngFor="let kun of data.reading.kunyomi; let i = index"
        [class.border]="kun === data.hiragana"
        class="relative bg-gray-100 rounded-md p-3 flex space-x-4 my-3 items-start"
      >
        <div
          *ngIf="kun === data.hiragana"
          class="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-1 z-10"
        >
          Utama
        </div>
        <mat-icon
          *ngIf="voicesLoaded"
          aria-hidden="false"
          (click)="onListen(kun, i)"
          aria-label="Example home icon"
          [fontIcon]="i === speakingIndex ? 'volume_up' : 'volume_mute'"
          style="color: black"
        ></mat-icon>
        <div class="flex flex-col">
          <ct size="ch">{{ kun }}</ct>
          <ct size="nt">{{ kun | hiraganaToRomaji }}</ct>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Mnemonic Bacaan</ct>

      <div class="my-3">
        <divider />
      </div>
      <!-- <ct>{{ data.readingData.mnemonic }}</ct> -->
      <mnemonic
        [mnemonic]="data.readingData.mnemonic"
        [keyKanji]="data.keyKanji"
        [keyRadical]="data.keyRadical"
        [keyReading]="data.keyReading"
      />
      <div
        *ngIf="data.readingData.hint != ''"
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
      <ct size="ft">Kombinasi Radical</ct>

      <div class="my-3">
        <divider />
      </div>

      <div class="flex flex-wrap gap-4 my-3 items-center">
        <div
          *ngFor="let k of data.radicalCombination; let i = index"
          class="flex items-center gap-x-3"
        >
          <kanji-box [meaning]="k.meaning" (click)="goTo(k.char)">{{
            k.char
          }}</kanji-box>
          <div
            *ngIf="
              data.radicalCombination.length > 1 &&
              i != data.radicalCombination.length - 1
            "
            class="text-4xl"
          >
            +
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Kanji yang Mirip Secara Visual</ct>

      <div class="my-3">
        <divider />
      </div>

      <div class="flex flex-wrap gap-4 my-3">
        <kanji-box
          *ngFor="let k of data.similarKanji; let i = index"
          [hiragana]="k.hiragana"
          [meaning]="k.meaning"
          (click)="goTo(k.char)"
          >{{ k.char }}</kanji-box
        >
      </div>
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 my-4">
      <ct size="ft">Ditemukan Dalam Kosakata</ct>

      <div class="my-3">
        <divider />
      </div>

      <div class="flex flex-col gap-y-3">
        <vocab-box
          *ngFor="let v of data.similarKanji; let i = index"
          [hiragana]="v.hiragana"
          [meaning]="v.meaning"
          (click)="goTo(v.char)"
          >{{ v.char }}</vocab-box
        >
      </div>
    </div>
    <fk></fk>`,
})
export class KanjiDetailComponent implements OnInit {
  @Input()
  data!: IBaseKanji;
  // text to speech related
  speechSynthesis!: globalThis.SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  voicesLoaded: boolean = false;
  speakingIndex: number | undefined;
  @Input()
  goTo!: (char: string) => void;

  constructor(private ngZone: NgZone) {}

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

  onListen(str: string, idx: number) {
    if (this.voicesLoaded && str != '') {
      const message = str;
      let utterance = new SpeechSynthesisUtterance(message);
      const voice = this.voices.find((voice) => voice.lang === 'ja-JP');
      utterance.voice = voice ? voice : null;
      utterance.pitch = 1.5;
      utterance.rate = 0.5;
      utterance.volume = 1;
      this.speakingIndex = idx;

      utterance.onend = () => {
        this.ngZone.run(() => {
          this.speakingIndex = undefined;
        });
      };

      this.speechSynthesis.speak(utterance);
    } else {
      console.error('speech synth not supported or voices not loaded yet');
    }
  }
}
