import { TipoUsuario } from './tipo-usuario';

export interface Usuario  {
  id_usuario: number;
  nome: string;
  login: string;
  senha: string;
  tipo_usuario: TipoUsuario;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
