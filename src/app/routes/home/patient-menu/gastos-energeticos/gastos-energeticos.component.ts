import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IPatientmin } from '../../../../shared/models/patientmin.model';
import { PatientStore } from '../../../../shared/store/patiente-store';
import { ConvertTimestampDatePipe } from '../../../../shared/pipes/convert-timestamp-date/convert-timestamp-date.pipe';
import { nivelAtivArray } from './const';
import { protocolos } from './const';

@Component({
  selector: 'app-gastos-energeticos',
  templateUrl: './gastos-energeticos.component.html',
  styleUrls: ['./gastos-energeticos.component.scss']
})
export class GastosEnergeticosComponent implements OnInit {

  private convertTimestampDatePipe: ConvertTimestampDatePipe = new ConvertTimestampDatePipe();
  public formularioPrincipal: FormGroup;
  public dateFormat = Date.now();
  public nivelAtivArray = nivelAtivArray[0];
  public protocolosArray = protocolos;
  public title: string;

  constructor(
    private formBuilder: FormBuilder,
    private patienteStore: PatientStore,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.formularioPrincipal.get('id').value === null ? this.consultDataRegister() : this.loadForm();
    this.triggersControls();
  }

  public buildForm(): void {
    this.formularioPrincipal = this.formBuilder.group({
      id: [null],
      desc: [null, [Validators.required, Validators.max(200)]],
      dataAtend: [null, Validators.required],
      idade: [null, Validators.required],
      sexo: [null],
      altura: [null, Validators.required],
      peso: [null, Validators.required],
      protocolo: [0],
      nivelAtiv: [null, Validators.required],
      gastoEnergFinal: [null, Validators.required],
      classificacao: [null, Validators.required],
      massaMagra: [null, Validators.required],
    })
  }

  public consultDataRegister(): void {
    this.patienteStore.patiente$.subscribe((resp: IPatientmin) => {
      this.formularioPrincipal.patchValue({
        idade: this.convertTimestampDatePipe.transform((new Date(resp.txt_DN['seconds'] * 1000)), true),
        sexo: resp.txt_Sexo,
        altura: resp.informationAdd.height,
        peso: resp.informationAdd.weight,
        dataAtend: this.dateFormat,
      })
    });
  }

  public loadForm(): void {

  }
  public triggersControls(): void {
    this.formularioPrincipal.get('protocolo').valueChanges.subscribe(value => {
      this.nivelAtivArray = nivelAtivArray[value];

      this.title = this.protocolosArray[value].title;

      value === '5' ? this.formularioPrincipal.get('nivelAtiv').clearValidators :
        this.formularioPrincipal.get('nivelAtiv').setValidators(Validators.required);

      value === '4' ? this.formularioPrincipal.get('massaMagra').setValidators(Validators.required) :
        this.formularioPrincipal.get('massaMagra').clearValidators;

      value === '3' ? this.formularioPrincipal.get('classificacao').setValidators(Validators.required) :
        this.formularioPrincipal.get('classificacao').clearValidators;

    })
  }

}
