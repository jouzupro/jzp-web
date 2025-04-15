import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'katakanaToRomaji'
})
export class KatakanaToRomajiPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
