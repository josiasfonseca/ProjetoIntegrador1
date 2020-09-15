import { NgxSpinnerModule } from 'ngx-spinner';
import { ShareModule } from './../../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportadorRoutingModule } from './importador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ImportadorListComponent } from './importador-list/importador-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportadorClienteComponent } from './importador-cliente/importador-cliente.component';
import { ImportadorFornecedorComponent } from './importador-fornecedor/importador-fornecedor.component';
import { ImportadorResultFornecedorErroComponent } from './importador-result-fornecedor-erro/importador-result-fornecedor-erro.component';
import { ImportadorResultClienteErroComponent } from './importador-result-cliente-erro/importador-result-cliente-erro.component';



@NgModule({
  declarations: [
    ImportadorListComponent,
    ImportadorClienteComponent,
    ImportadorFornecedorComponent,
    ImportadorResultFornecedorErroComponent,
    ImportadorResultClienteErroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ImportadorRoutingModule,
    FormsModule,
    ShareModule,
    NgxSpinnerModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class ImportadorModule { }
