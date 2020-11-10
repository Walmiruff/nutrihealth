import { IRefeicao } from './refeicao.model';

export interface IPlanoAlim {
    codTipoDieta?: number;
    ativo?: number;
    calculado?: boolean;
    diasSemana?: Array<number>;
    data?: string;
    nome?: string;
    descricao?: string;
    id?: string;
    statusOnline?: number;
    refeicoes?: Array<IRefeicao>;
}

export interface IPlanoAlim {
    data?: string;
    descricao?: string;
    diasSemana?: Array<number>;
}