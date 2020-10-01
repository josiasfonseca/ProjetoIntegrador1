import { TipoUsuario } from './tipo-usuario';

export interface Usuario  {
  id_usuario: number;
  nome: string;
  login: string;
  senha: string;
  cpf: string;
  email: string;
  telefone: string;
  whatsapp: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  codigo_municipio: string;
  cidade: string;
  tipo_usuario: TipoUsuario;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
