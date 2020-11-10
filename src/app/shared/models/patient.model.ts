export interface IPatient {
  id: number | string;
  txt_Nome: string;
  txt_DN: string;
  txt_email?: string;
  txt_Tel?: string;
  txt_Cel?: string;

  txt_Sexo: string;
  txt_End?: string;
  txt_CEP?: string;
  txt_Cidade?: string;

  txt_pais?: string;

  txt_UF?: string;
  txt_NomeResp?: string;
  txt_Plano?: string;

  txt_Foto?: string;
}


export interface IPatientmin {
  id?: string;
  txt_Nome?: string;
  txt_DN?: string;
  txt_email?: string;
  txt_Foto?: string;
  txt_Cel?: string;
  txt_Tel?: string;
  txt_Sexo?: string;
  weight?: string;
  height?: string;
  objective?: string;
  lastKcal?: string;
}
