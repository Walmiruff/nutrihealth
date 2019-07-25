import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  getSexo () {
    return [
      { valor: 'm', desc: 'Masculino' },
      { valor: 'f', desc: 'Feminino' }
     ];
  }


}
