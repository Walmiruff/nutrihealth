import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  getTabelas() {
    return [
      {
        nome: 'Todas',
        valor: 0
      },
      {
        nome: 'IBGE',
        valor: 1
      },
      {
        nome: 'TACO',
        valor: 2
      },
      {
        nome: 'Tucunduva',
        valor: 3
      },
      {
        nome: 'Marcas',
        valor: 4
      },
      {
        nome: 'Suplementos',
        valor: 5
      },
      {
        nome: 'Meus Alimentos',
        valor: 6
      }
    ];
  }
}
