import { Layout } from './layout';
export interface LayoutRecebimento {
  id_recebimento: number;
  descricao: string;
  empresa_id: number;
  layout_id: number;
  layout: Layout;
}
