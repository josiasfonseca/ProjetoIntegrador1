import { Usuario } from 'src/app/model/usuario';

export interface Empresa {
  id_empresa: number;
  nome: string;
  cnpj: string;
  usuario: Usuario;
}
