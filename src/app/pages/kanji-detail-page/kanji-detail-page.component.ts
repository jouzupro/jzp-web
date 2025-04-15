import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { KanjiBoxComponent } from '../../components/kanji-box/kanji-box.component';
import { VocabBoxComponent } from '../../components/vocab-box/vocab-box.component';

@Component({
  selector: 'app-kanji-detail-page',
  imports: [
    CustomTypographyComponent,
    DividerComponent,
    MatIconModule,
    CommonModule,
    KanjiBoxComponent,
    VocabBoxComponent,
  ],
  templateUrl: './kanji-detail-page.component.html',
  styleUrl: './kanji-detail-page.component.css',
})
export class KanjiDetailPageComponent implements OnInit {
  id = '';
  speechSynthesis!: globalThis.SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  voicesLoaded: boolean = false;
  isSpeaking: boolean = false;
  kanjiData = {
    reading: 'きん',
    char: '金',
    meaning: ['Uang', 'Emas', 'Metal'],
    onyomi: ['キン', 'コン', 'ゴン'],
    kunyomi: ['かね', 'かな-', '-がね'],
    radicalCombination: [
      {
        char: '金',
        meaning: 'Gold',
      },
    ],
    visuallySimilar: [
      {
        char: '企',
        hiragana: 'き',
        meaning: 'Plan',
      },
      {
        char: '全',
        hiragana: 'ぜん',
        meaning: 'All',
      },
    ],
    foundInVocab: [
      {
        char: '代金',
        hiragana: 'だいきん',
        meaning: 'Cost',
      },
    ],
  };

  constructor(private actRoute: ActivatedRoute, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.queryParams['id'];
    console.log(this.actRoute.snapshot.queryParams['id']);

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

  onListen() {
    if (this.voicesLoaded) {
      const message = 'ありがとうございます';
      let utterance = new SpeechSynthesisUtterance(message);
      const voice = this.voices.find((voice) => voice.lang === 'ja-JP');
      utterance.voice = voice ? voice : null;
      utterance.pitch = 1.5;
      utterance.rate = 0.5;
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
