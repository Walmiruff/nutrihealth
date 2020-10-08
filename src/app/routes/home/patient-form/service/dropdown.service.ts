import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  getSexo () {
    return [
      { valor: 'M', desc: 'Masculino' },
      { valor: 'F', desc: 'Feminino' }
     ];
  }


}
