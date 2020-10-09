
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-crud-alim',
  templateUrl: './modal-crud-alim.component.html',
  styleUrls: ['./modal-crud-alim.component.scss']
})
export class ModalCrudAlimComponent implements OnInit {

  @Input() public id: string;
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public porcaoModalRef: BsModalRef,
  ) {
    this.form = this.formBuilder.group({
      descricao: [null],
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
    this.submit();
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

  console.log('form', this.form.value);
 }

}
