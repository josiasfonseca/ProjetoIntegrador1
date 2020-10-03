import { Layout } from './layout';
export interface LayoutPagamento {
  id_pagamento: number;
  descricao: string;
  empresa_id: number;
  layout_id: number;
  layout: Layout;
}
