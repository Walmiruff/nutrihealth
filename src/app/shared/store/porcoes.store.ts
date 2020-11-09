import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { IPorcoes } from '../models/porcoes.model';


@Injectable({
    providedIn: 'root'
})
export class PortionStore {

    private portionsSource = new BehaviorSubject<IPorcoes[]>(null);
    private portions: IPorcoes[] = [];
    portions$ = this.portionsSource.asObservable();

    public set(portions: IPorcoes[]): void {
        this.portionsSource.next(portions);
    };

    public add(portion: IPorcoes): void {
        this.portions.push(portion);
        this.portionsSource.next(this.portions);
    }
 
}
