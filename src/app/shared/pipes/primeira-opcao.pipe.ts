import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeiraOpcao'
})
export class PrimeiraOpcaoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('value', value);
    console.log('args', args);
    return null;
  }

}
