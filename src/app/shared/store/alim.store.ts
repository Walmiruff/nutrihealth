import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { IAlimento } from '../models/alimentos.model';


@Injectable({
    providedIn: 'root'
})
export class AlimStore {

    private alimsSource = new BehaviorSubject<IAlimento[]>(null);
    private alims: IAlimento[] = [];
    alims$ = this.alimsSource.asObservable();

    public set(alims: IAlimento[]): void {
        this.alimsSource.next(alims);
    };

    public add(alim: IAlimento): void {
        this.alims.push(alim);
        this.alimsSource.next(this.alims);
    }

    public remove(alim: IAlimento): void{
        this.alims = this.alims.filter((a) => a.idAlimento !== alim.idAlimento);
        this.alimsSource.next(this.alims);
    }

    public update(alim: IAlimento): void {
        const target = this.getId(alim.idAlimento);
        Object.assign(target, alim);
        this.alimsSource.next(this.alims);
    }

    public getId(alimId: number | string): IAlimento {
        return this.alims.find((element) => element.idAlimento === alimId );
    }
 
}
