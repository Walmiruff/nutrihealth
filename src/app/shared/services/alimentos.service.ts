import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, forkJoin, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { IAlimento } from '../models/alimentos.model';
import { IPorcoes } from '../models/porcoes.model';
import { PortionStore } from '../store/porcoes.store';
import { AlimListStore } from '../store/alim-list.store';

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
    private alimListStore: AlimListStore,
  ) { }

  public load(IBGE: IAlimento[], TACO: IAlimento[]): Observable<IAlimento[]>[] {
    return this.url = [this.alimIBGE$ = of(IBGE), this.alimTACO$ = of(TACO)];
  }

  public getAlimentos(tabela: string | number): Observable<Array<IAlimento>> {
    if (tabela === 'NUTRI') {
      return this.alimListStore.alims$;
    } else {
      let n: number;
      switch (tabela) {
        case 'IBGE':
          n = 0;
          break;
        case 'TACO':
          n = 1;
          break;
        default:
          n = 1;
          break;
      }
      return (this.url[n]).pipe(
        map((resp) => resp['alimentos']),
        shareReplay(1),
      );
    }
  }

  public getAllAlimentos(): Observable<Array<IAlimento>> {
    return forkJoin(this.getAlimentos('IBGE'), this.getAlimentos('TACO'))
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
        this.alimListStore.add(form);
      });
  }

  public getAlimsDB(): Observable<IAlimento[]> {
    const authRef = this.firestore.collection('user_alimento').doc(localStorage.getItem('uid'));
    return authRef.collection<IAlimento>('alimento').valueChanges();
  }

}


// IBGE 4
// TACO 1
// Tucunduva 3
// Marcas 6
// Suplementos 13
