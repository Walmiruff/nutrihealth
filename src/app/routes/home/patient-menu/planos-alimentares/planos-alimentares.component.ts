import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { AlimentosService } from '../../../../shared/services/alimentos.service';
import { IAlimento, IPorcoes } from '../../../../shared/models/alimentos.model';
import { switchMap, map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-planos-alimentares',
  templateUrl: './planos-alimentares.component.html',
  styleUrls: ['./planos-alimentares.component.scss']
})
export class PlanosAlimentaresComponent implements OnInit {

  public alimentos$: Observable<Array<IAlimento>>;
  public porcoes$: Observable<Array<IPorcoes>>;
  public hiddenModalRef: boolean = false;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alimentosService: AlimentosService
    ) { }

  ngOnInit() {
  this.alimentos$ = this.alimentosService.getAlimentos();
  this.buildForms();
  this.triggersControls();
  }

  public modalHiddenRef(): void {
    this.hiddenModalRef = !this.hiddenModalRef;
  }

  public buildForms(): void  {
    this.form = this.formBuilder.group({
      alimento: [null]
    })
  }

  public triggersControls(): void {
    this.form.controls.alimento.valueChanges
    .pipe(
      switchMap( value => {
        return this.porcoes$ =  this.alimentos$
        .pipe(
          map((alimentos) => alimentos.filter((alimento) => alimento.id == value)
          ),
          map((alimentos) => alimentos[0].porcoes)
        )
      }),
     
    )
    .subscribe();
  }

}