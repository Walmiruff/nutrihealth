import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IPatientmin } from '../models/patient.model';


@Injectable({
    providedIn: 'root'
})
export class PatientStore {

    private patienteSource = new BehaviorSubject<IPatientmin>(null);

    patiente$ = this.patienteSource.asObservable().pipe(shareReplay(1));

    set(patiente: IPatientmin) {
        this.patienteSource.next(patiente);
    }
}
