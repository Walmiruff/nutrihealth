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
        valor: 'IBGE'
      },
      {
        nome: 'TACO',
        valor: 'TACO'
      },
      {
        nome: 'Tucunduva',
        valor: 'Tucunduva'
      },
      {
        nome: 'Marcas',
        valor: 'Marcas'
      },
      {
        nome: 'Suplementos',
        valor: 'Suplementos'
      },
      {
        nome: 'Meus Alimentos',
        valor: 'NUTRI'
      }
    ];
  }
}
