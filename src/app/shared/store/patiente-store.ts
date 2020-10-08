import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IPatientmin } from '../models/patientmin.model';


@Injectable({
    providedIn: 'root'
})
export class PatientStore {

    private patienteSource = new BehaviorSubject<IPatientmin>(null);

    patiente$ = this.patienteSource.asObservable();

    set(patiente: IPatientmin) {
        this.patienteSource.next(patiente);
    }
}
