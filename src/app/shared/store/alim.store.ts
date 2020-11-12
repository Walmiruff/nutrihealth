import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IAlimento } from '../models/alimentos.model';


@Injectable({
    providedIn: 'root'
})
export class AlimStore {

    private alimsSource = new BehaviorSubject<IAlimento[]>(null);
    private alims: IAlimento[] = [];
    alims$ = this.alimsSource.asObservable().pipe(shareReplay(1));

    public set(alims: IAlimento[]): void {
        this.alims = alims;
        this.alimsSource.next(this.alims);
    };

    public add(alim: IAlimento): void {
        this.alims.push(alim);
        this.alimsSource.next(this.alims);
    }

    public remove(idAlimento: string): void{
        this.alims = this.alims.filter((a) => a.idAlimento !== idAlimento);
        this.alimsSource.next(this.alims);
    }

    public removeAll(): void {
        this.alims.splice(0);
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
