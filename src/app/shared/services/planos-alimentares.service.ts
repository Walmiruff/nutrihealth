import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IPlanoAlim } from '../models/plano-alim.model';

@Injectable({
  providedIn: 'root'
})
export class PlanosAlimentaresService {

  constructor(private firestore: AngularFirestore) { }

  addPlano(data: IPlanoAlim) {
    const authRef = this.firestore.collection('users_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection('planos_alimentares').add(data) // add form full
      .then(docRef => {
        authRef.collection('planos_alimentares_min').doc(docRef.id).set({ // set form min
          id: docRef.id,
          data: data.data,
          diasSemana: data.diasSemana,
          descricao: data.descricao,
        });
         authRef.collection('planos_alimentares').doc(docRef.id).update({ id: docRef.id });
      });
  }
}
