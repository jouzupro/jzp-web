import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RomajiToHiraganaPipe } from '../../pipes/romaji-to-hiragana/romaji-to-hiragana.pipe';
import { FormsModule } from '@angular/forms';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { CommonModule } from '@angular/common';

interface IQuestions {
  kanji: string;
  type: string;
  answer: string[];
}

@Component({
  selector: 'app-lesson-preview',
  imports: [MatIconModule, FormsModule, ExpansionPanelComponent, CommonModule],
  templateUrl: './lesson-preview.component.html',
  styleUrl: './lesson-preview.component.css',
})
export class LessonPreviewComponent {
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
    if (!this.answered) {
      for (let i = 0; i < this.currentQuestion.answer.length; i++) {
        const element = this.currentQuestion.answer[i];

        if (this.romajiInput === element) {
          this.isCorrect = true;
        } else {
          this.isCorrect = false;
        }
      }
      this.answered = true;
    } else {
      this.answered = false;
      this.nextQuestion();
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
