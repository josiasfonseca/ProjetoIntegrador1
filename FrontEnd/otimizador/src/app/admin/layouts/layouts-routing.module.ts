import { LayoutRecebimentoDetailsComponent } from './layout-recebimento-details/layout-recebimento-details.component';
import { LayoutRecebimentoFormComponent } from './layout-recebimento-form/layout-recebimento-form.component';
import { LayoutRecebimentoListComponent } from './layout-recebimento-list/layout-recebimento-list.component';
import { LayoutPagamentoListComponent } from './layout-pagamento-list/layout-pagamento-list.component';
import { LayoutPagamentoFormComponent } from './layout-pagamento-form/layout-pagamento-form.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPagamentoDetailsComponent } from './layout-pagamento-details/layout-pagamento-details.component';


const routes: Routes = [
  {path: '', component: LayoutsComponent },
  // pagamentos
  {path: 'pagamentos/:id', component: LayoutPagamentoListComponent},
  {path: 'pagamentos/:id/novo', component: LayoutPagamentoFormComponent},
  {path: 'pagamentos/detalhes/:id', component: LayoutPagamentoDetailsComponent},
  {path: 'pagamentos/:id/editar', component: LayoutPagamentoFormComponent},
  // recebimentos
  {path: 'recebimentos/:id', component: LayoutRecebimentoListComponent},
  {path: 'recebimentos/:id/novo', component: LayoutRecebimentoFormComponent},
  {path: 'recebimentos/detalhes/:id', component: LayoutRecebimentoDetailsComponent},
  {path: 'recebimentos/:id/editar', component: LayoutRecebimentoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
