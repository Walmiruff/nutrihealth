import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take, tap, map, switchMap, filter } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

import { DropdownService } from './service/dropdown.service';
import { PatientService } from '../../../shared/services/patient.service';
import { IFormCanDeactivate } from '../../../shared/models/form-candesactivate.model';
import { ModalService } from '../../../shared/services/modal.service';
import { MessageStore } from '../../../shared/store/message.store';
import { messages } from '../../../shared/const/messages';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, IFormCanDeactivate {

  private formMudou = false; // verifica se modificou o form
  disableInput = true;
  formulario: FormGroup;
  txt_Sexo: any[];
  pacienteSemEmail: any[];
  // param para o card que estao fora do form
  pacienteNome: string;
  pacienteFoto: string;
  pacienteId: string;
  pacienteCelular: string;
  pacienteEmail: string;
  // interpolação para data
  dateFormat: any;
  // Datepicker
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  bsConfig = {
    containerClass: 'theme-blue',
    dateInputFormat: 'DD/MM/YYYY'
  };
  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private pacienteService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private bsLocaleService: BsLocaleService,
    private messageStore: MessageStore, 
  ) {
    // Datepicker
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.txt_Sexo = this.dropdownService.getSexo();

    this.configurarFormulario();

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        filter(id => id !== undefined),
        switchMap(id => this.pacienteService.getPatientId(id))
      )
      .subscribe(paciente => {
        this.formulario.patchValue(paciente);
        this.dateFormat = (this.formulario.get('txt_DN').value).toDate(); // mostra a data formatada no form
        this.pacienteNome = this.formulario.get('txt_Nome').value; // mostra info no card
        this.pacienteFoto = this.formulario.get('txt_Foto').value;
        this.pacienteCelular = 'tel:' + this.formulario.get('txt_Cel').value;
        this.pacienteEmail = 'mailto:' + this.formulario.get('txt_email').value;
      });

  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      txt_Nome: [null, [Validators.required, Validators.maxLength(90)]],
      txt_NomeResp: [null, [Validators.maxLength(90)]],
      txt_Sexo: ['m'],
      txt_DN: [null, [Validators.required]],

      txt_pais: [null, [Validators.maxLength(50)]],
      txt_End: [null, Validators.maxLength(200)],
      txt_CEP: [null, Validators.maxLength(20)],
      txt_Cidade: [null, Validators.maxLength(40)],
      txt_UF: [null, Validators.maxLength(40)],

      txt_Cel: [null, [Validators.maxLength(25)]],
      txt_Tel: [null, Validators.maxLength(25)],
      txt_email: [null, [Validators.email, Validators.maxLength(80)]],
      enviarEmailPaciente: ['s'],
      pacienteSemEmail: ['false'],
      txt_Plano: [null, [Validators.maxLength(60)]],
      txt_Foto: ['assets/img/usr.jpg']
    });
  }





  onSubmit() {

    if (this.formulario.valid && this.formulario.get('id').value == null) {
      // insert

      this.pacienteService.addPatient(this.formulario.value)
        .then(() => {
          this.messageStore.set(messages[2]);
          this.resetar();
          this.formMudou = false;
          this.router.navigate(['/app']);
        })
        .catch((error: any) => {
          this.messageStore.set(messages[3]);
        });
    }


    if (this.formulario.valid && this.formulario.get('id').value != null) {
      // update

      this.pacienteService.updatePatient(this.formulario.value, this.formulario.get('id').value)
        .then(() => {
          this.messageStore.set(messages[4]);
          this.resetar();
          this.formMudou = false;
          this.router.navigate(['/app']);
        })
        .catch((error: any) => {
          this.messageStore.set(messages[5]);
        });

    }

    if (!this.formulario.valid) {
      this.verificaValidacoesForm(this.formulario);
    }


  }


  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {

      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }


  resetar() {
    this.formulario.reset();
  }


  onClickChecked() {
    this.disableInput = !this.disableInput;
  }


  onInput() { // verifica se modificou o form
    this.formMudou = true;
    // console.log('mudou');
  }

  podeDesativar() {
    return this.podeMudarRota();
  }


  podeMudarRota() {
    if (this.formMudou) {
      const title = 'Cadastro';
      const msg = 'Deseja sair da página?';
      const result$ = this.modalService.showModalConfirm(title, msg, 'Sim', 'Não');
     return result$.asObservable()
        .pipe( take(1), tap(result => !!result));
     } else {
      return true; // return para canDesactived permite que a rota mude se o form nao mudou
    }
  }


  goToApp() {
    this.router.navigate(['/app']);
  }



}
