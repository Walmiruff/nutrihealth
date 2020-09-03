import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAlimento } from '../models/alimentos.model';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  private url = '../../../assets/resources/alimentos/TACO.json';

  constructor(private http: HttpClient) { }

  public getAlimentos(): Observable<Array<IAlimento>> {
    return this.http.get<Array<IAlimento>>(this.url)
    .pipe(
      map((resp) => resp['alimentos']),
      shareReplay()
      );
  }
}
