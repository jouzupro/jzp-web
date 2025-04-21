import { Pipe, PipeTransform } from '@angular/core';
import hiraganaData from '../../../assets/json/hiragana.json';

@Pipe({
  name: 'hiraganaToRomaji'
})
export class HiraganaToRomajiPipe implements PipeTransform {
  private hiraganaMap: { [key: string]: string } = this.createHiraganaMap();

  private createHiraganaMap(): { [key: string]: string } {
    const map: { [key: string]: string } = {};
    hiraganaData.forEach(item => {
      map[item.hiragana] = item.romaji;
    });
    return map;
  }

  transform(value: string): string {
    if (!value) {
      return '';
    }

    let romaji = '';
    for (let i = 0; i < value.length; i++) {
      if (i + 1 < value.length) {
        const combinedChar = value.substring(i, i + 2);
        if (this.hiraganaMap[combinedChar]) {
          romaji += this.hiraganaMap[combinedChar];
          i++; // Skip the next character since it's part of the combined one
          continue;
        }
      }
      const char = value[i];
      if (this.hiraganaMap[char]) {
        romaji += this.hiraganaMap[char];
      } else {
        romaji += char; // If the character is not Hiragana, keep it as is
      }
    }
    return romaji;
  }
}
