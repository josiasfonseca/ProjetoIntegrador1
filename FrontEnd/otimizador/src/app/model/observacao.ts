import { Controle } from './controle';

export interface Observacao {
  observacao: string;
  mes_referencia: string;
  controle_id: Controle;
  controles: Controle;
}
