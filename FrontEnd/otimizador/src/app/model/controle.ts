import { Observacao } from './observacao';
export interface Controle {
  id_controle: number;
  ano: string;
  empresa_id: number;
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
  observacoes: Observacao;
}
