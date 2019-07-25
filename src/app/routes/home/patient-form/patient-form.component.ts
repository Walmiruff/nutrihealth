import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';


import { DropdownService } from './service/dropdown.service';
import { PatientService } from '../../../shared/services/patient.service';
import { IFormCanDeactivate } from './guards/iform-candesactivate';

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

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private pacienteService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.txt_Sexo = this.dropdownService.getSexo();

    const codigoPaciente = this.route.snapshot.params['id'];

    this.configurarFormulario();



    if (codigoPaciente) {
      this.carregarPaciente(codigoPaciente);
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      txt_Nome: [null, [Validators.required, Validators.maxLength(90)]],
      txt_NomeResp: [null, [Validators.maxLength(90)]],
      txt_Sexo: ['m'],
      txt_DN: [null, [Validators.required]],

      txt_pais: [null, [Validators.required, Validators.maxLength(50)]],
      txt_End: [null, Validators.maxLength(200)],
      txt_CEP: [null, Validators.maxLength(20)],
      txt_Cidade: [null, Validators.maxLength(40)],
      txt_UF: [null, Validators.maxLength(4)],

      txt_Cel: [null, [Validators.maxLength(25)]],
      txt_Tel: [null, Validators.maxLength(25)],
      txt_email: [null, [Validators.email, Validators.maxLength(80)]],
      enviarEmailPaciente: ['s'],
      pacienteSemEmail: ['false'],
      txt_Plano: [null, [Validators.maxLength(60)]],
    });
  }



  carregarPaciente(codigo: number) {
    // this.pacienteService.buscarPorCodigo(codigo)
    //  .then(paciente => {
    //   this.formulario.patchValue(paciente)
    //   });
  }


  onSubmit() {


    // if (this.formulario.valid && this.formulario.get('id').value == null) {
    //   // insert
    //   this.pacienteService.postPaciente(this.formulario)
    //     .pipe(take(1))
    //     .subscribe(dados => {
    //       // console.log(dados);
    //       // reseta o form
    //       this.resetar();
    //       this.pacienteService.getListaPacientes();
    //       // aqui coloca um alert que foi gravado com sucesso
    //       this.formMudou = false;
    //       this.router.navigate(['/pages/software-nutrition'])

    //     },
    //       (error: any) => alert('Erro ao gravar!'));
    // }


    // if (this.formulario.valid && this.formulario.get('id').value != null) {
    //   // update
    //   this.pacienteService.putPaciente(this.formulario, parseInt(this.formulario.get('id').value))
    //     .pipe(take(1))
    //     .subscribe(dados => {
    //       // console.log(dados);
    //       // reseta o form
    //       this.resetar();
    //       this.pacienteService.getListaPacientes();
    //       //aqui coloca um alert que foi alterado com sucesso
    //       this.formMudou = false;
    //       this.router.navigate(['/pages/software-nutrition'])
    //     },
    //       (error: any) => alert('Erro ao editar!'));

    // } else {
    //   this.verificaValidacoesForm(this.formulario);
    // }


  }


  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      // console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsUntouched();

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

  podeMudarRota() {
    if (this.formMudou === true) {
      if (confirm('Você deseja sair da página?') === true) {
        return true;
      }
    }

    if (this.formMudou === false) {
      return true;
    }
  }


  podeDesativar() {
    return this.podeMudarRota();
  }




}
