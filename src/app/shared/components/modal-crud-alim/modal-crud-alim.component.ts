
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { v4 as uuid } from 'uuid';

import { IAlimento } from '../../models/alimentos.model';
import { AlimentosService } from '../../services/alimentos.service';

@Component({
  selector: 'app-modal-crud-alim',
  templateUrl: './modal-crud-alim.component.html',
  styleUrls: ['./modal-crud-alim.component.scss']
})
export class ModalCrudAlimComponent implements OnInit {

  @Input() public id: string;
  public form: FormGroup;
  public newForm: IAlimento;

  constructor(
    private formBuilder: FormBuilder,
    private alimentosService: AlimentosService,
    public alimModalRef: BsModalRef,
  ) {
    this.form = this.formBuilder.group({
      descricao: ['Teste Alimento'],
      idGrupo: [1],
      grupoAlimentar: [null], // enum
      origem: ['NUTRI'],
      auditado: [false],
      calorias: [null],
      proteinas: [null],
      gordurasTotais: [null],
      gordurasSaturadas: [null],
      gordurasMonoinsaturadas: [null],
      gordurasPoliInsaturadas: [null],
      gordurasTrans: [null],
      carboidratos: [null],
      fibras: [null],
      calcio: [null],
      magnesio: [null],
      manganes: [null],
      fosforo: [null],
      ferro: [null],
      sodio: [null],
      potassio: [null],
      cobre: [null],
      zinco: [null],
      selenio: [null],
      vitaminaA_Retinol: [null],
      vitaminaB1: [null],
      vitaminaB2: [null],
      vitaminaB3: [null],
      vitaminaB5: [null],
      vitaminaB6: [null],
      vitaminaB7: [null],
      vitaminaB9: [null],
      vitaminaB12: [null],
      vitaminaD: [null],
      vitaminaE: [null],
      vitaminaC: [null],
      colesterol: [null],
      acucar: [null],
      editavel: [true],
      id: [null],
      statusOnline: [0], //  usar esse campo para fazer a conversão da porção
    });
  }

  ngOnInit() {
  }

  public submit(): void {
    this.form.value['porcoes'] = [
      {
        descricao: '100 gramas',
        gramas: 100.0,
        editavel: false,
        id: 0,
        statusOnline: 0
      },
      {
        descricao: 'Grama',
        gramas: 1.0,
        editavel: false,
        id: 61352,
        statusOnline: 0
      }
    ];

    this.newForm = this.form.value;

    if (this.id === undefined) {
      this.newForm.id = uuid();
      this.alimentosService.addAlimDB(this.newForm).then(() => {
        this.alimModalRef.hide();
      });
    } else {
      // update
    }

  }

}
