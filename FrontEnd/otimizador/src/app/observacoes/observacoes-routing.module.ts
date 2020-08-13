import { ObservacoesListComponent } from './observacoes-list/observacoes-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ObservacoesListComponent},
  { path: ':id', component: ObservacoesListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservacoesRoutingModule { }
