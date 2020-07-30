import { IPatientminMesures } from "./patient-mesures";

export interface IPatientmin {
  id: string;
  txt_Nome: string;
  txt_DN: string;
  txt_email?: string;
  txt_Foto?: string;
  txt_Cel?: string;
  txt_Tel?: string;
  informationAdd?: IPatientminMesures;
}
