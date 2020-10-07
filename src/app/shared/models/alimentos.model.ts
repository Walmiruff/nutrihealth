export interface IAlimento {
    idAlimento?: string;
    ordemListagem?: number;
    porcao?: string;
    porcaoGramas?: number;
    quantidade?: number;
    descricao: string;
    idGrupo: number;
    grupoAlimentar: string;
    origem: string;
    auditado: boolean;
    calorias: number;
    proteinas: number;
    gordurasTotais: number;
    gordurasSaturadas: number;
    gordurasMonoinsaturadas: number;
    gordurasPoliInsaturadas: number;
    gordurasTrans: number;
    carboidratos: number;
    fibras: number;
    calcio: number;
    magnesio: number;
    manganes: number;
    fosforo: number;
    ferro: number;
    sodio: number;
    potassio: number;
    cobre: number;
    zinco: number;
    selenio: number;
    vitaminaA_Retinol: number;
    vitaminaB1: number;
    vitaminaB2: number;
    vitaminaB3: number;
    vitaminaB5: number;
    vitaminaB6: number;
    vitaminaB7: number;
    vitaminaB9: number;
    vitaminaB12: number;
    vitaminaD: number;
    vitaminaE: number;
    vitaminaC: number;
    colesterol: number;
    acucar: number;
    porcoes?: Array<IPorcoes>;
    editavel: boolean;
    id: number;
    statusOnline: number;
}

export interface IPorcoes {
    descricao: string;
    gramas: number;
    editavel: boolean;
    id: number;
    statusOnline: number;
}