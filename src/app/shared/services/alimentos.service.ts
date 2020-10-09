import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable,forkJoin, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { IAlimento, IPorcoes } from '../models/alimentos.model';
import { PortionStore } from '../store/porcoes.store';
import { AlimStore } from '../store/alim.store';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  private url: Observable<IAlimento[]>[];
  private alimIBGE$: Observable<IAlimento[]>;
  private alimTACO$: Observable<IAlimento[]>;

  constructor(
    private firestore: AngularFirestore,
    private portionStore: PortionStore,
    private alimStore: AlimStore,
    ) { }

  public load(IBGE: IAlimento[], TACO: IAlimento[]): Observable<IAlimento[]>[] {
   return this.url = [ this.alimIBGE$ = of(IBGE),  this.alimTACO$ = of(TACO)];
  }

  public getAlimentos(n: number): Observable<Array<IAlimento>> {
    if (n === 6) {
     return this.alimStore.alims$;
    } else {
      return (this.url[n - 1])
        .pipe(
          map((resp) => resp['alimentos']),
          shareReplay(1),
        );
    }
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

  public getPorcoes(): Observable<IPorcoes[]> {
    const authRef = this.firestore.collection('user_porcao').doc(localStorage.getItem('uid'));
    return authRef.collection<IPorcoes>('porcao').valueChanges();
  }

  public addAlimDB(form: IAlimento) {
    const authRef = this.firestore.collection('user_alimento').doc(localStorage.getItem('uid'));
    return authRef.collection('alimento').add(form) // add
      .then(() => {
        this.alimStore.add(form);
      });
  }

  public getAlimsDB(): Observable<IAlimento[]> {
    const authRef = this.firestore.collection('user_alimento').doc(localStorage.getItem('uid'));
    return authRef.collection<IAlimento>('alimento').valueChanges();
  }

}
