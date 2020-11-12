import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IPlanoAlim } from '../models/plano-alim.model';

@Injectable({
  providedIn: 'root'
})
export class PlanosAlimentaresService {

  constructor(private firestore: AngularFirestore) { }

  addPlano(dataPlan: IPlanoAlim) {
    const authRef = this.firestore.collection('user_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection('planos_alimentares').add(dataPlan) // add form full
      .then(docRef => {
        authRef.collection('planos_alimentares_min').doc(docRef.id).set({ // set form min
          id: docRef.id,
          data: dataPlan.data,
          diasSemana: dataPlan.diasSemana,
          descricao: dataPlan.descricao,
        });
         authRef.collection('planos_alimentares').doc(docRef.id).update({ id: docRef.id });
      });
  }

  getMin() {
    const authRef = this.firestore.collection('user_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection<IPlanoAlim>('planos_alimentares_min').valueChanges();
  }

  getId(id: string) {
    const authRef = this.firestore.collection('user_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection<IPlanoAlim>('planos_alimentares').doc(id).valueChanges();
  }

  updatePlano(dataPlan: IPlanoAlim, id: string) {
    const authRef = this.firestore.collection('user_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection('planos_alimentares').doc(id).update(dataPlan)
      .then(() => {
        authRef.collection('planos_alimentares_min').doc(id).update({
          id: id,
          data: dataPlan.data,
          diasSemana: dataPlan.diasSemana,
          descricao: dataPlan.descricao,
        });
      });
  }
}
