import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RomajiToHiraganaPipe } from '../../pipes/romaji-to-hiragana/romaji-to-hiragana.pipe';
import { FormsModule } from '@angular/forms';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { CheckIfTypoPipe } from '../../pipes/check-if-typo/check-if-typo.pipe';

interface IQuestions {
  kanji: string;
  type: string;
  answer: string[];
}

export interface SpeechSynthesisVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

export interface SpeechSynthesis {
  paused: boolean;
  pending: boolean;
  speaking: boolean;
}

@Component({
  selector: 'app-lesson-preview',
  imports: [
    MatIconModule,
    FormsModule,
    ExpansionPanelComponent,
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './lesson-preview.component.html',
  styleUrl: './lesson-preview.component.css',
})
export class LessonPreviewComponent implements OnInit {
  lessons: IQuestions[] = [
    { kanji: '猫', type: 'kunyomi', answer: ['ねこ'] },
    { kanji: '川', type: 'meaning', answer: ['river'] },
    { kanji: '土', type: 'meaning', answer: ['earth', 'dirt'] },
    { kanji: '一', type: 'onyomi', answer: ['いち'] },
    { kanji: '十', type: 'onyomi', answer: ['じゅう'] },
  ];

  romajiInput = '';
  isCorrect: boolean | null = null;
  answered: boolean = false;
  isAnswerTypo: undefined | 'correct' | 'incorrect' | 'typo' = undefined;
  currentQuestionIndex = 0;
  progressPercentage = 0;
  speechSynthesis!: globalThis.SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  voicesLoaded: boolean = false;

  ngOnInit() {
    this.updateProgress();
    if ('speechSynthesis' in window) {
      console.log('speechSynthesis in window');

      this.speechSynthesis = window.speechSynthesis;

      this.speechSynthesis.onvoiceschanged = () => {
        this.voices = this.speechSynthesis.getVoices();
        this.voicesLoaded = true;
        console.log('Voices loaded:', this.voices);
      };

      this.voices = this.speechSynthesis.getVoices();
      this.voicesLoaded = this.voices.length > 0;

      if (!this.voicesLoaded) {
        console.log('Voices not immediately available, waiting for voiceschanged event.');
      }
    }
  }

  get currentQuestion(): IQuestions {
    return this.lessons[this.currentQuestionIndex];
  }

  onInputChange() {
    if (this.lessons[this.currentQuestionIndex].type != 'meaning') {
      this.romajiInput = new RomajiToHiraganaPipe().transform(this.romajiInput.toLowerCase());
    }
  }

  onEnter() {
    if (!this.answered) {
      this.isAnswerTypo = new CheckIfTypoPipe().transform(
        this.romajiInput,
        this.currentQuestion.answer
      );
      this.isCorrect =
        this.isAnswerTypo === 'correct' || this.isAnswerTypo === 'typo';
      this.answered = true;
    } else {
      this.answered = false;
      this.isAnswerTypo = undefined;
      this.nextQuestion();
    }
  }

  onListen() {
    console.log('test', this.speechSynthesis);
    if (this.voicesLoaded) {
      const message = this.lessons[this.currentQuestionIndex].kanji;
      let utterance = new SpeechSynthesisUtterance(message);
      const voice = this.voices.find((voice) => voice.lang === 'ja-JP');
      utterance.voice = voice ? voice : null;
      utterance.pitch = 1.5;
      utterance.rate = 0.8;
      utterance.volume = 1;
      console.log('speak started');
      this.speechSynthesis.speak(utterance);
    } else {
      console.error('speech synth not supported or voices not loaded yet');
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.lessons.length - 1) {
      this.currentQuestionIndex++;
      this.romajiInput = '';
      this.isCorrect = null;
      this.updateProgress();
    } else {
      // Handle the end of the lesson (e.g., show a completion message)
      alert('Lesson completed!');
    }
  }

  updateProgress() {
    this.progressPercentage =
      (this.currentQuestionIndex / (this.lessons.length - 1)) * 100;
  }
}
