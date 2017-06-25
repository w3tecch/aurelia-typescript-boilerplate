import moment from 'moment';

export class DateFormatValueConverter {
  public toView(value: Date): string {
    return moment(value).format('LLLL');
  }
}
