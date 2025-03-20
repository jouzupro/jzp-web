import { Pipe, PipeTransform } from '@angular/core';
import hiraganaData from '../../../assets/json/hiragana.json';
@Pipe({
  name: 'romajiToHiragana',
})
export class RomajiToHiraganaPipe implements PipeTransform {
  private readonly romajiToHiraganaMappings: {
    romaji: string;
    hiragana: string;
  }[] = hiraganaData;
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    let hiragana = '';
    let i = 0;

    while (i < value.length) {
      // Check for sokuon (っ)
      if (
        i + 1 < value.length &&
        value[i] === value[i + 1] &&
        'kstpch'.includes(value[i])
      ) {
        hiragana += 'っ';
        i++;
        continue;
      }

      let longestMatch = '';
      for (const mapping of this.romajiToHiraganaMappings) {
        if (
          value.startsWith(mapping.romaji, i) &&
          mapping.romaji.length > longestMatch.length
        ) {
          longestMatch = mapping.romaji;
        }
      }

      if (longestMatch) {
        const mapping = this.romajiToHiraganaMappings.find(
          (m) => m.romaji === longestMatch
        );
        hiragana += mapping!.hiragana;
        i += longestMatch.length;
      } else {
        hiragana += value[i];
        i++;
      }
    }

    return hiragana;
  }
}
