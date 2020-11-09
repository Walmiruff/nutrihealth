import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { switchMap, map, filter, tap, take } from 'rxjs/operators';

import { AlimentosService } from '../../../../shared/services/alimentos.service';
import { DropdownService } from './service/dropdown.service';
import { IAlimento } from '../../../../shared/models/alimentos.model';
import { IRefeicao } from '../../../../shared/models/refeicao.model';
import { ModalService } from '../../../../shared/services/modal.service';
import { PortionStore } from '../../../../shared/store/porcoes.store';
import { AlimStore } from '../../../../shared/store/alim.store';
import { RefeicaoStore } from '../../../../shared/store/refeicao.store';

@Component({
  selector: 'app-planos-alimentares',
  templateUrl: './planos-alimentares.component.html',
  styleUrls: ['./planos-alimentares.component.scss']
})


export class PlanosAlimentaresComponent implements OnInit {
  public alimentos$: Observable<Array<IAlimento>>;
  public porcoes: any[] = [];
  public hiddenModalRef: Boolean = false;
  public form: FormGroup;
  public formPorcao: FormGroup;
  public formModalRef: FormGroup;
  public tabelas: any[] = [];
  public alimSelected: IAlimento;

  constructor(
    private formBuilder: FormBuilder,
    private alimentosService: AlimentosService,
    private dropdownService: DropdownService,
    private portionStore: PortionStore,
    private modalService: ModalService,
    private alimStore: AlimStore,
    private refeicaoStore: RefeicaoStore,
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
      tabelas: [0],
      porcoes: [null],
      quantidade: [null]
    });

    this.formPorcao = this.formBuilder.group({
      descricao: [null],
      gramas: [null],
      editavel: true,
      id: [null],
      statusOnline: 1,
    });

    this.formModalRef = this.formBuilder.group({
      horarioRefeicao: [null],
      tipoRefeicao: [null],
      observacaoRefeicao: [null]
    })
  }

  public triggersControls(): void {
    this.form.controls.tabelas.valueChanges.subscribe(value => {
      this.alimentos$ = null;
      this.porcoes.splice(0);
      this.form.controls.alimento.reset();
      value === 0 ? this.alimentos$ = this.alimentosService.getAllAlimentos() : this.alimentos$ = this.alimentosService.getAlimentos(value);
    });
    this.form.controls.alimento.valueChanges
      .pipe(
        filter(value => value !== null),
        switchMap(value => {
          this.porcoes.splice(0);
          return this.alimentos$
            .pipe(
              map((alimentos) => alimentos.filter((alimento) => alimento.id == (value))),
              map((alimentos) => {
                this.alimSelected = alimentos[0];
                alimentos[0].porcoes.forEach(element => {
                  this.porcoes.push(element);
                });
              })
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
      filter(porcoes => porcoes.length > 0),
      map((porcoes) => porcoes.filter((porcao) => porcao.id === idAlim)),
    ).subscribe((porcoes) => {
      porcoes.forEach(element => {
        this.porcoes.push(element);
      });
    });
  }

  public novaPorcao(): void {
    this.modalService.showModalAlim();
  }

  public addAlim(): void {
    const alim: IAlimento = {
      idAlimento: uuid(),
      ordemListagem: this.alimSelected.ordemListagem,
      porcao: this.form.controls.porcoes.value.split('-')[1],
      porcaoGramas: Number(this.form.controls.porcoes.value.split('-')[0]),
      quantidade: Number(this.form.controls.quantidade.value),
      descricao: this.alimSelected.descricao,
      idGrupo: this.alimSelected.idGrupo,
      grupoAlimentar: this.alimSelected.grupoAlimentar,
      origem: this.alimSelected.origem,
      auditado: this.alimSelected.auditado,
      calorias: this.alimSelected.calorias,
      proteinas: this.alimSelected.proteinas,
      gordurasTotais: this.alimSelected.gordurasTotais,
      gordurasSaturadas: this.alimSelected.gordurasSaturadas,
      gordurasMonoinsaturadas: this.alimSelected.gordurasMonoinsaturadas,
      gordurasPoliInsaturadas: this.alimSelected.gordurasPoliInsaturadas,
      gordurasTrans: this.alimSelected.gordurasTrans,
      carboidratos: this.alimSelected.carboidratos,
      fibras: this.alimSelected.fibras,
      calcio: this.alimSelected.calcio,
      magnesio: this.alimSelected.magnesio,
      manganes: this.alimSelected.manganes,
      fosforo: this.alimSelected.fosforo,
      ferro: this.alimSelected.ferro,
      sodio: this.alimSelected.sodio,
      potassio: this.alimSelected.potassio,
      cobre: this.alimSelected.cobre,
      zinco: this.alimSelected.zinco,
      selenio: this.alimSelected.selenio,
      vitaminaA_Retinol: this.alimSelected.vitaminaA_Retinol,
      vitaminaB1: this.alimSelected.vitaminaB1,
      vitaminaB2: this.alimSelected.vitaminaB2,
      vitaminaB3: this.alimSelected.vitaminaB3,
      vitaminaB5: this.alimSelected.vitaminaB5,
      vitaminaB6: this.alimSelected.vitaminaB6,
      vitaminaB7: this.alimSelected.vitaminaB7,
      vitaminaB9: this.alimSelected.vitaminaB9,
      vitaminaB12: this.alimSelected.vitaminaB12,
      vitaminaD: this.alimSelected.vitaminaD,
      vitaminaE: this.alimSelected.vitaminaE,
      vitaminaC: this.alimSelected.vitaminaC,
      colesterol: this.alimSelected.colesterol,
      acucar: this.alimSelected.acucar,
      editavel: this.alimSelected.editavel,
      id: this.alimSelected.id,
      statusOnline: this.alimSelected.statusOnline
    };

    this.alimStore.add(alim);
  }

  public saveRef(): void  {
    this.formModalRef.controls.tipoRefeicao.value;
    const ref: IRefeicao = {
      id: this.formModalRef
    }
    this.refeicaoStore.update(ref);
  }

}
