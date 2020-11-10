import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { IPatientmin } from '../../../shared/models/patient.model';
import { PatientService } from '../../../shared/services/patient.service';
import { ModalService } from '../../../shared/services/modal.service';
import { PatientStore } from '../../../shared/store/patiente-store';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  public patients$: Observable<IPatientmin[]>;
  // config toast
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true
  });

  constructor(
    private pacienteService: PatientService,
    private modalService: ModalService,
    private patienteStore: PatientStore,
    public toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.patients$ = this.pacienteService.getPatientmin();
  }


  onDelete(id: string) {
    const title = 'Deletar Paciente';
    const msg = 'Deseja excluir o cadastro do paciente?';
    const result$ = this.modalService.showModalConfirm(title, msg, 'Sim', 'Não');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.pacienteService.deletePatient(id) : EMPTY)
      )
      .subscribe(success => {
        this.toasterService.pop('success', 'Cadastro', 'Paciente deletado com sucesso!');
      }, error => {
        this.toasterService.pop('error', 'Error', 'Error ao deletar o Paciente.');
      });
  }

  setPatientStore(patientSelected: IPatientmin) {
    this.patienteStore.set(patientSelected);
  }

}
