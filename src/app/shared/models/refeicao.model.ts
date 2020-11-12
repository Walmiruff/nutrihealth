import { IAlimento } from './alimentos.model';

export interface IRefeicao {
    horario?: string;
    itens?: string;
    descricao?: string;
    observacao?: string;
    id: string;
    statusOnline?: number;
    alimentos?: Array<IAlimento>;
}