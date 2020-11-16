import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IRefeicao } from '../models/refeicao.model';


@Injectable({
    providedIn: 'root'
})
export class RefeicaoStore {
    private refsSource = new BehaviorSubject<IRefeicao[]>(null);
    private refs: IRefeicao[] = [];
    refs$ = this.refsSource.asObservable().pipe(shareReplay(1));

    public set(refs: IRefeicao[]): void {
        this.refs = refs;
        this.refsSource.next(this.refs);
    };

    public add(ref: IRefeicao): void {
        this.refs.push(ref);
        this.refsSource.next(this.refs);
    }

    public remove(refId: string): void {
        this.refs = this.refs.filter((a) => a.id !== refId);
        this.refsSource.next(this.refs);
    }

    public removeAll(): void {
       this.refs.splice(0);
       this.refsSource.next(this.refs);
    }

    public update(ref: IRefeicao): void {
        const target = this.getId(ref.id);
        Object.assign(target, ref);
        this.refsSource.next(this.refs);
    }

    public getId(refId: number | string): IRefeicao {
        return this.refs.find((element) => element.id === refId);
    }

}
