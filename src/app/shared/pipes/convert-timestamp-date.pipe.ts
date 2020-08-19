import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'convertTimestampDate'
})
export class ConvertTimestampDatePipe implements PipeTransform {

  transform(input: Date, noStrg?: boolean): string {
    const now = new Date;
    let years = 0;
    let age = '';

    years = now.getFullYear() - input.getFullYear();

    if (noStrg === true) {
      if (years > 0) {
        age = years.toString();
      } else {
        if (now.getMonth() - input.getMonth() > 1) {
          age = (now.getMonth() - input.getMonth()).toString();
        } else {
          age = (now.getMonth() - input.getMonth()).toString();
        }
      }
    } else {
      if (years > 0) {
        age = years.toString() + ' anos';
      } else {
        if (now.getMonth() - input.getMonth() > 1) {
          age = (now.getMonth() - input.getMonth()).toString() + ' meses';
        } else {
          age = (now.getMonth() - input.getMonth()).toString() + ' mês';
        }
      }
    }

    return age;
  }

}
