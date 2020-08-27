import { ImportadorClienteComponent } from './importador-cliente/importador-cliente.component';
import { ImportadorListComponent } from './importador-list/importador-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ImportadorListComponent},
  { path: ':id', component: ImportadorListComponent},
  { path: 'importador-clientes/:id', component: ImportadorClienteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportadorRoutingModule { }
