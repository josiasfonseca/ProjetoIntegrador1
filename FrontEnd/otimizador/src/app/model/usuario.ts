import { Status } from './../enums/status';
import { TipoFuncionario } from './../enums/tipoFuncionario';
export interface Usuario  {
  id_usuario: number;
  nome: string;
  login: string;
  senha: string;
  tipo_usuario: TipoFuncionario;
}
