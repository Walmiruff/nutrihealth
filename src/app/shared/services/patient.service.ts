import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IPatient } from '../models/patient.model';
import { IPatientmin } from '../models/patientmin.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private firestore: AngularFirestore) {

  }

  addPatient(dataPatient: IPatient) {
   const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
   return  authRef.collection('patient').add(dataPatient) // add form full
   .then( docRef => {
    authRef.collection('patientmin').doc(docRef.id).set({ // set form min
      id: docRef.id,
      txt_Nome: dataPatient.txt_Nome,
      txt_DN: dataPatient.txt_DN,
      txt_email: dataPatient.txt_email,
      txt_Tel: dataPatient.txt_Tel,
      txt_Foto: 'assets/img/usr.jpg'
    });
    authRef.collection('patient').doc(docRef.id).update({id: docRef.id});
   });
  }

  getPatientmin() {
    const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
    return authRef.collection<IPatientmin>('patientmin').valueChanges();
  }

  getPatientId(id: string) {
    const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
    return authRef.collection<IPatient>('patient').doc(id).valueChanges();
  }


  updatePatient(dataPatient: IPatient, id: string) {
    const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
    return  authRef.collection('patient').doc(id).update(dataPatient) // add form full
    .then( () => {
     authRef.collection('patientmin').doc(id).update({ // set form min
       id: id,
       txt_Nome: dataPatient.txt_Nome,
       txt_DN: dataPatient.txt_DN,
       txt_email: dataPatient.txt_email,
       txt_Tel: dataPatient.txt_Tel,
       txt_Foto: dataPatient.txt_Foto,
     });
    });
   }

   deletePatient(id: string) {
    const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
    return  authRef.collection('patient').doc(id).delete()
    .then( () => authRef.collection('patientmin').doc(id).delete() );
   }

}
