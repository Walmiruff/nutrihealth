import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IGastosEnerg } from '../models/gastos-energ.model';
import { PatientStore } from '../store/patiente-store';


@Injectable({
  providedIn: 'root'
})
export class GastosEnergeticosService {

  constructor(
    private firestore: AngularFirestore,
    private patienteStore: PatientStore,
  ) { }

  add(data: IGastosEnerg) {
    const authRef = this.firestore.collection('user_gastos_energeticos').doc(localStorage.getItem('uid'));
    const authRefUserPatient =  this.firestore.collection('users_patient').doc(localStorage.getItem('uid'));
    return authRef.collection('gastos_energeticos').add(data) // add
      .then(docRef => {
        let idPatiente;
        this.patienteStore.patiente$.subscribe(resp => idPatiente = resp.id);
        authRef.collection('gastos_energeticos_min').doc(docRef.id).set({ // set
          id: docRef.id,
          desc: data.desc,
          dataAtend: data.dataAtend,
        });
        authRef.collection('gastos_energeticos').doc(docRef.id).update({ id: docRef.id });
        authRefUserPatient.collection('patientmin').doc(idPatiente).update({
          weight: data.peso,
          height: data.altura,
        }
        );
      });
  }

  update(data: IGastosEnerg, id: string) {
    const authRef = this.firestore.collection('user_gastos_energeticos').doc(localStorage.getItem('uid'));
    return authRef.collection('gastos_energeticos').doc(id).update(data)
      .then(() => {
        authRef.collection('gastos_energeticos_min').doc(id).update({
          id: id,
          desc: data.desc,
          dataAtend: data.dataAtend,
        });
        authRef.collection('patientmin').doc(id).update({
          informationAdd: {
            weight: data.peso,
            height: data.altura,
          }
        });
      })

  }
}
