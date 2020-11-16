import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IPlanoAlim, IPlanoAlimMin } from '../models/plano-alim.model';

@Injectable({
  providedIn: 'root'
})
export class ModelosPlanosAlimentaresService {

  constructor(private firestore: AngularFirestore) { }

  addPlano(dataPlan: IPlanoAlim) {
    const authRef = this.firestore.collection('user_modelos_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection('modelos_planos_alimentares').add(dataPlan) // add form full
      .then(docRef => {
        authRef.collection('modelos_planos_alimentares_min').doc(docRef.id).set({ // set form min
          id: docRef.id,
          nome: dataPlan.nome,
        });
         authRef.collection('modelos_planos_alimentares').doc(docRef.id).update({ id: docRef.id });
      });
  }

  getMin() {
    const authRef = this.firestore.collection('user_modelos_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection<IPlanoAlimMin>('modelos_planos_alimentares_min').valueChanges();
  }

  getId(id: string) {
    const authRef = this.firestore.collection('user_modelos_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection<IPlanoAlim>('modelos_planos_alimentares').doc(id).valueChanges();
  }

  updatePlano(dataPlan: IPlanoAlim, id: string) {
    const authRef = this.firestore.collection('user_modelos_planos_alimentares').doc(localStorage.getItem('uid'));
    return authRef.collection('modelos_planos_alimentares').doc(id).update(dataPlan)
      .then(() => {
        authRef.collection('modelos_planos_alimentares_min').doc(id).update({
          id: id,
          data: dataPlan.data,
          diasSemana: dataPlan.diasSemana,
          descricao: dataPlan.descricao,
        });
      });
  }
}
