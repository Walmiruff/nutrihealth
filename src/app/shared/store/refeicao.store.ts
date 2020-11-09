import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { IRefeicao } from '../models/refeicao.model';


@Injectable({
    providedIn: 'root'
})
export class RefeicaoStore {
    // primeira opção
    // 0 Café da Manhã
    // 1 Lanche da Manhã
    // 2 Almoço
    // 3 Lanche da Tarde
    // 4 Jantar
    // 5 Lanche da Noite
    // 6 Lanche Extra 1
    // 7 Lanche Extra 2

    // segunda opção
    // 8 Café da Manhã
    // 9 Lanche da Manhã
    // 10 Almoço
    // 11 Lanche da Tarde
    // 12 Jantar
    // 13 Lanche da Noite
    // 14 Lanche Extra 1
    // 15 Lanche Extra 2

    private refsSource = new BehaviorSubject<IRefeicao[]>(null);
    private refs: IRefeicao[] = [];
    refs$ = this.refsSource.asObservable();

    public set(refs: IRefeicao[]): void {
        this.refsSource.next(refs);
    };

    public add(ref: IRefeicao): void {
        this.refs.push(ref);
        this.refsSource.next(this.refs);
    }

    public remove(ref: IRefeicao): void {
        this.refs = this.refs.filter((a) => a.id !== ref.id);
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
