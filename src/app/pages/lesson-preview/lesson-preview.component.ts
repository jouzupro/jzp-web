import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RomajiToHiraganaPipe } from '../../pipes/romaji-to-hiragana/romaji-to-hiragana.pipe';
import { FormsModule } from '@angular/forms';
// import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { CommonModule } from '@angular/common';

interface IQuestions {
  kanji: string;
  type: string;
  answer: string;
}

@Component({
  selector: 'app-lesson-preview',
  imports: [
    MatIconModule,
    FormsModule,
    // ExpansionPanelComponent,
    CommonModule,
  ],
  templateUrl: './lesson-preview.component.html',
  styleUrl: './lesson-preview.component.css',
})
export class LessonPreviewComponent {
  lessons: IQuestions[] = [
    { kanji: '猫', type: 'kunyomi', answer: 'ねこ' },
    { kanji: '川', type: 'meaning', answer: 'river' },
    { kanji: '山', type: 'meaning', answer: 'mountain' },
    { kanji: '水', type: 'meaning', answer: 'water' },
    { kanji: '火', type: 'meaning', answer: 'fire' },
    { kanji: '木', type: 'meaning', answer: 'tree' },
    { kanji: '金', type: 'meaning', answer: 'gold' },
    { kanji: '土', type: 'meaning', answer: 'earth' },
    { kanji: '日', type: 'meaning', answer: 'day' },
    { kanji: '月', type: 'meaning', answer: 'month' },
    { kanji: '人', type: 'meaning', answer: 'person' },
    { kanji: '犬', type: 'kunyomi', answer: 'いぬ' },
    { kanji: '本', type: 'kunyomi', answer: 'ほん' },
    { kanji: '分', type: 'kunyomi', answer: 'ふん' },
    { kanji: '時', type: 'kunyomi', answer: 'じ' },
    { kanji: '一', type: 'onyomi', answer: 'いち' },
    { kanji: '二', type: 'onyomi', answer: 'に' },
    { kanji: '三', type: 'onyomi', answer: 'さん' },
    { kanji: '四', type: 'onyomi', answer: 'し' },
    { kanji: '五', type: 'onyomi', answer: 'ご' },
    { kanji: '六', type: 'onyomi', answer: 'ろく' },
    { kanji: '七', type: 'onyomi', answer: 'しち' },
    { kanji: '八', type: 'onyomi', answer: 'はち' },
    { kanji: '九', type: 'onyomi', answer: 'きゅう' },
    { kanji: '十', type: 'onyomi', answer: 'じゅう' },
  ];

  romajiInput = '';
  isCorrect: boolean | null = null;
  currentQuestionIndex = 0;
  progressPercentage = 0;

  get currentQuestion(): IQuestions {
    return this.lessons[this.currentQuestionIndex];
  }

  onInputChange() {
    if (this.lessons[this.currentQuestionIndex].type != 'meaning') {
      this.romajiInput = new RomajiToHiraganaPipe().transform(this.romajiInput);
    }
  }

  onEnter() {
    if (this.romajiInput === this.currentQuestion.answer) {
      this.isCorrect = true;
      this.nextQuestion();
    } else {
      this.isCorrect = false;
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

  ngOnInit() {
    this.updateProgress();
  }
}
