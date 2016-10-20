//import * as moment from 'moment'; => not needed as it's global

export class DateFormatValueConverter {
  public toView(value: Date): string {
    return moment(value).format('M/D/YYYY h:mm:ss a');
  }
}
