import { LayoutsComponent } from './layouts/layouts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPagamentoComponent } from './layout-pagamento/layout-pagamento.component';


const routes: Routes = [
  {path: '', component: LayoutsComponent },
  {path: 'pagamentos/:id', component: LayoutPagamentoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
