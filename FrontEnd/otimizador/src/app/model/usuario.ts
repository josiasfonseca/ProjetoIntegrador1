import { TipoUsuario } from './tipo-usuario';

export interface Usuario  {
  id_usuario: number;
  nome: string;
  login: string;
  senha: string;
  tipo_usuario: TipoUsuario;
}
