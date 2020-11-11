import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GastosEnergeticosService } from '../../../../../shared/services/gastos-energeticos.service';
import { IGastosEnergMin } from '../../../../../shared/models/gastos-energ.model';
import { PlanosAlimentaresService } from '../../../../../shared/services/planos-alimentares.service';
import { IPlanoAlim } from '../../../../../shared/models/plano-alim.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  public gastosEnergs$: Observable<IGastosEnergMin[]>;
  public planosAlim$: Observable<IPlanoAlim[]>;

  constructor(
    private router: Router,
    private gastosEnergeticosService: GastosEnergeticosService,
    private planosAlimentaresService: PlanosAlimentaresService,
    ) { }

  ngOnInit() {
    this.gastosEnergs$ = this.gastosEnergeticosService.getMin();
    this.planosAlim$ = this.planosAlimentaresService.getMin();
  }

  navigateTo(link: string) {
     this.router.navigate([this.router.url.replace('/cards', link)]);
  }

  navigateToById(link: string, id: string ) {
    this.router.navigate([this.router.url.replace('/cards', `${link}/${id}`)]);
 }

}
