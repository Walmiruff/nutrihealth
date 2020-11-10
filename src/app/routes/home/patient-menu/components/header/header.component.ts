import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { PatientStore } from '../../../../../shared/store/patiente-store';
import { IPatientmin } from '../../../../../shared/models/patient.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private idPatient: string;
  public patiente$: Observable<IPatientmin>;

  constructor(
    private route: ActivatedRoute,
    private patienteStore: PatientStore,
    ) { }

  ngOnInit() {
    this.route.params
    .pipe(
      map((params: any) => this.idPatient = params['id']),
    ).subscribe();

    this.loadingDataPatiente();
  }

  loadingDataPatiente() {
   this.patiente$ = this.patienteStore.patiente$;
  }

}
