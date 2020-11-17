import { Pipe, PipeTransform } from '@angular/core';
 
import { IAlimento } from '../models/alimentos.model';

@Pipe({
  name: 'primOrSecOp'
})
export class PrimOrSecOpPipe implements PipeTransform {

  transform(alimentos: IAlimento[], primOrSec?: number): IAlimento[] {
    if (primOrSec === 1) {
        return alimentos.filter((alim) => alim.ordemListagem === 1);
    } else {
      return alimentos.filter((alim) => alim.ordemListagem === 2);
    }
  }

}
