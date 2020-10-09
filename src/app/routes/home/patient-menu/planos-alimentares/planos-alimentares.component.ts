import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map, filter, tap, take } from 'rxjs/operators';

import { AlimentosService } from '../../../../shared/services/alimentos.service';
import { IAlimento, IPorcoes } from '../../../../shared/models/alimentos.model';
import { DropdownService } from './service/dropdown.service';
import { PortionStore } from '../../../../shared/store/porcoes.store';
import { ModalService } from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-planos-alimentares',
  templateUrl: './planos-alimentares.component.html',
  styleUrls: ['./planos-alimentares.component.scss']
})


export class PlanosAlimentaresComponent implements OnInit {

  public alimentos$: Observable<Array<IAlimento>>;
  public porcoes: IPorcoes[];
  public hiddenModalRef: Boolean = false;
  public form: FormGroup;
  public formPorcao: FormGroup;
  public tabelas: any[];

  constructor(
    private formBuilder: FormBuilder,
    private alimentosService: AlimentosService,
    private dropdownService: DropdownService,
    private portionStore: PortionStore,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.buildForms();
    this.triggersControls();
    this.alimentos$ = this.alimentosService.getAllAlimentos();
    this.tabelas = this.dropdownService.getTabelas();
  }

  public modalHiddenRef(): void {
    this.hiddenModalRef = !this.hiddenModalRef;
  }

  public buildForms(): void {
    this.form = this.formBuilder.group({
      alimento: [null],
      tabelas: [0]
    });

    this.formPorcao = this.formBuilder.group({
      descricao: [null],
      gramas: [null],
      editavel: true,
      id: [null],
      statusOnline: 1,
    });
  }

  public triggersControls(): void {
    this.form.controls.tabelas.valueChanges.subscribe(value => {
      this.alimentos$ = null;
      this.porcoes = [];
      this.form.controls.alimento.reset();
      value === 0 ? this.alimentos$ = this.alimentosService.getAllAlimentos() : this.alimentos$ = this.alimentosService.getAlimentos(value);
      
      this.alimentos$.subscribe((r) => console.log('rep', r));
      
    });
    this.form.controls.alimento.valueChanges
      .pipe(
        filter(value => value !== null),
        switchMap(value => {
          this.alimentos$ = null;
          this.porcoes = [];
          return this.alimentos$
            .pipe(
              map((alimentos) => alimentos.filter((alimento) => alimento.id == (value))),
              map((alimentos) => this.porcoes = alimentos[0].porcoes)
            );
        }),
      )
      .subscribe(() => this.getPortionCustom(this.form.controls.alimento.value));
  }

  public onConfirm(): void {
    this.formPorcao.controls.id.patchValue(this.form.controls.alimento.value);
    this.alimentosService.addPorcao(this.formPorcao.value);
  }

  public getPortionCustom(idAlim: number | string): void {
    this.portionStore.portions$.pipe(
      take(1),
      map((porcoes) => porcoes.filter((porcao) => porcao.id === idAlim)),
      filter(porcoes => porcoes.length > 0),
      tap((porcoes) => this.porcoes.push(porcoes[0])),
    ).subscribe();
  }

  public novaPorcao(): void {
    this.modalService.showModalAlim();
  }

}
