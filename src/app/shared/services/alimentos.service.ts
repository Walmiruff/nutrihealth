import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { IAlimento, IPorcoes } from '../models/alimentos.model';
import { PortionStore } from '../store/porcoes.store';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  private url = [
    '../../../assets/resources/alimentos/IBGE.json',
    '../../../assets/resources/alimentos/TACO.json'
  ];

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private portionStore: PortionStore
    ) { }

  public getAlimentos(n: number): Observable<Array<IAlimento>> {
    return this.http.get<Array<IAlimento>>(this.url[n - 1])
      .pipe(
        shareReplay(1),
        map((resp) => resp['alimentos']),
      );
  }

  public getAllAlimentos(): Observable<Array<IAlimento>> {
    return forkJoin(this.getAlimentos(1), this.getAlimentos(2))
    .pipe(map(([a1, a2]) => [...a1, ...a2]));
  }

  public addPorcao(form: IPorcoes) {
    const authRef = this.firestore.collection('user_porcao').doc(localStorage.getItem('uid'));
    return authRef.collection('porcao').add(form) // add
      .then(() => {
        this.portionStore.add(form);
      });
  }

  public getPorcao(): Observable<IPorcoes[]> {
    const authRef = this.firestore.collection('user_porcao').doc(localStorage.getItem('uid'));
    return authRef.collection<IPorcoes>('porcao').valueChanges();
  }

}
