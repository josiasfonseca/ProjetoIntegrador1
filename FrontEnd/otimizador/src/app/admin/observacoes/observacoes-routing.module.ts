import { ObservacoesFormComponent } from './observacoes-form/observacoes-form.component';
import { ObservacoesListComponent } from './observacoes-list/observacoes-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ObservacoesListComponent},
  { path: ':id', component: ObservacoesListComponent},
  { path: ':id/editar', component: ObservacoesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservacoesRoutingModule { }
