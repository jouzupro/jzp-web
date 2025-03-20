import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkIfTypo',
})
export class CheckIfTypoPipe implements PipeTransform {
  transform(
    answer: string,
    correctAnswers: string[]
  ): 'correct' | 'incorrect' | 'typo' {
    if (!answer || !correctAnswers || correctAnswers.length === 0) {
      return 'incorrect';
    }

    const normalizedAnswer = answer.trim().toLowerCase();

    for (const correctAnswer of correctAnswers) {
      const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();

      if (normalizedAnswer === normalizedCorrectAnswer) {
        return 'correct';
      }

      const distance = this.levenshteinDistance(
        normalizedAnswer,
        normalizedCorrectAnswer
      );
      const maxLength = Math.max(
        normalizedAnswer.length,
        normalizedCorrectAnswer.length
      );
      const typoThreshold = 0.2; // 20% typo threshold

      if (distance <= Math.floor(maxLength * typoThreshold)) {
        return 'typo';
      }
    }

    return 'incorrect';
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        if (str2.charAt(j - 1) === str1.charAt(i - 1)) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i - 1] + 1, // substitution
            matrix[j][i - 1] + 1, // insertion
            matrix[j - 1][i] + 1 // deletion
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}
