import { LayoutPagamentoListComponent } from './layout-pagamento-list/layout-pagamento-list.component';
import { LayoutPagamentoFormComponent } from './layout-pagamento-form/layout-pagamento-form.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPagamentoDetailsComponent } from './layout-pagamento-details/layout-pagamento-details.component';


const routes: Routes = [
  {path: '', component: LayoutsComponent },
  {path: 'pagamentos/:id', component: LayoutPagamentoListComponent},
  {path: 'pagamentos/detalhes/:id', component: LayoutPagamentoDetailsComponent},
  {path: 'pagamentos/:id/editar', component: LayoutPagamentoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
