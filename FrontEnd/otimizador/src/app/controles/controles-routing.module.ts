import { ControlesFormComponent } from './controles-form/controles-form.component';
import { ControlesListComponent } from './controles-list/controles-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ControlesListComponent},
  { path: ':id', component: ControlesListComponent},
  { path: ':id/editar', component: ControlesFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlesRoutingModule { }
