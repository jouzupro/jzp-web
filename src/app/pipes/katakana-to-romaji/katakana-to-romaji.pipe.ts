import { Pipe, PipeTransform } from '@angular/core';
import katakanaData from '../../../assets/json/katakana.json';

@Pipe({
  name: 'katakanaToRomaji'
})
export class KatakanaToRomajiPipe implements PipeTransform {
  private katakanaMap: { [key: string]: string } = this.createKatakanaMap();

  private createKatakanaMap(): { [key: string]: string } {
    const map: { [key: string]: string } = {};
    katakanaData.forEach(item => {
      map[item.katakana] = item.romaji;
    });
    return map;
  }

  transform(value: string): string {
    if (!value) {
      return '';
    }

    let romaji = '';
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (this.katakanaMap[char]) {
        romaji += this.katakanaMap[char];
      } else {
        romaji += char; // If the character is not Katakana, keep it as is
      }
    }
    return romaji;
  }
}
