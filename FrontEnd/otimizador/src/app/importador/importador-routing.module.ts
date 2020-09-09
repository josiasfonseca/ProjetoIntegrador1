import { ImportadorResultComponent } from './importador-result/importador-result.component';
import { ImportadorFornecedorComponent } from './importador-fornecedor/importador-fornecedor.component';
import { ImportadorClienteComponent } from './importador-cliente/importador-cliente.component';
import { ImportadorListComponent } from './importador-list/importador-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ImportadorListComponent},
  { path: ':id', component: ImportadorListComponent},
  { path: 'importador-clientes/:id', component: ImportadorClienteComponent},
  { path: 'importador-fornecedores/:id', component: ImportadorFornecedorComponent},
  { path: 'importador-fornecedores/resultado-confronto/:id', component: ImportadorResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportadorRoutingModule { }
