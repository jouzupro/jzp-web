import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

@Pipe({
  name: 'timeAgo',
  pure: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(
    value: string | Date | number | null | undefined,
    inputFormat?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      let date: dayjs.Dayjs;

      if (inputFormat) {
        date = dayjs(value, inputFormat);
      } else {
        date = dayjs(value);
      }

      if (!date.isValid()) {
        console.error(
          'Invalid date format:',
          value,
          'using format:',
          inputFormat
        );
        return '';
      }

      return date.fromNow();
    } catch (error) {
      console.error('Error processing date:', error);
      return '';
    }
  }
}
