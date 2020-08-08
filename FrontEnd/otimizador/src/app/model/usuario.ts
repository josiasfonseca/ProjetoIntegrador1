import { Status } from './../enums/status';
import { TipoFuncionario } from './../enums/tipoFuncionario';
export interface Usuario  {
  id: number;
  nome: string;
  login: string;
  senha: string;
  tipo: TipoFuncionario;
  ativo: Status;
}
