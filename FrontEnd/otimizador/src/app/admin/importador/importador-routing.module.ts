import { ImportadorCartaoComponent } from './importador-cartao/importador-cartao.component';
import { ImportadorResultClienteErroComponent } from './importador-result-cliente-erro/importador-result-cliente-erro.component';
import { ImportadorResultFornecedorErroComponent } from './importador-result-fornecedor-erro/importador-result-fornecedor-erro.component';
import { ImportadorFornecedorComponent } from './importador-fornecedor/importador-fornecedor.component';
import { ImportadorClienteComponent } from './importador-cliente/importador-cliente.component';
import { ImportadorListComponent } from './importador-list/importador-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ImportadorListComponent},
  { path: ':id', component: ImportadorListComponent},
  { path: 'importador-clientes/resultado-confronto/:id', component: ImportadorResultClienteErroComponent},
  { path: 'importador-clientes/:id', component: ImportadorClienteComponent},
  { path: 'importador-fornecedores/resultado-confronto/:id', component: ImportadorResultFornecedorErroComponent},
  { path: 'importador-fornecedores/:id', component: ImportadorFornecedorComponent},
  { path: 'importador-cartoes/:id', component: ImportadorCartaoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportadorRoutingModule { }
