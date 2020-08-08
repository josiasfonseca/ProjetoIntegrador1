import { ControlesListComponent } from './controles-list/controles-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ControlesListComponent},
  { path: ':id', component: ControlesListComponent},
  { path: ':id/editar', component: ControlesListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlesRoutingModule { }
