import { Usuario } from 'src/app/model/usuario';

export interface Empresa {
  id_empresa: number;
  nome: string;
  razao_social: string;
  cnpj: string;
  ie: string;
  im: string;
  tipo: string;
  contato: string;
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
  usuario: Usuario;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
