import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { EmpresasListComponent } from './empresas-list/empresas-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: EmpresasListComponent},
  {path: 'novo', component: EmpresasFormComponent},
  {path: ':id', component: EmpresasFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
