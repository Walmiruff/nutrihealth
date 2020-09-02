import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AlimentosService } from '../../../../shared/services/alimentos.service';
import { IAlimento } from '../../../../shared/models/alimentos.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-planos-alimentares',
  templateUrl: './planos-alimentares.component.html',
  styleUrls: ['./planos-alimentares.component.scss']
})
export class PlanosAlimentaresComponent implements OnInit {

  public alimentos$: Observable<Array<IAlimento>>;
  public hiddenModalRef: boolean = false;

  constructor(
    private alimentosService: AlimentosService
    ) { }

  ngOnInit() {
  this.alimentos$ = this.alimentosService.getAlimentos();
  this.alimentosService.getAlimentos().subscribe((resp) => console.log(resp));
  }

  public modalHiddenRef(): void {
    this.hiddenModalRef = !this.hiddenModalRef;
  }

}