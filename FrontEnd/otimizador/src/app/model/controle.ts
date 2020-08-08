import { Empresa } from './empresa';
export interface Controle {
  id_controle: number;
  ano: string;
  empresa_id: Empresa;
  jan: string;
  fev: string;
  mar: string;
  abr: string;
  mai: string;
  jun: string;
  jul: string;
  ago: string;
  set: string;
  out: string;
  nov: string;
  dez: string;
}
