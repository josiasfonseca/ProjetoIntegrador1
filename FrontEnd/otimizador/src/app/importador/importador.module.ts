import { ShareModule } from './../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportadorRoutingModule } from './importador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ImportadorListComponent } from './importador-list/importador-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportadorClienteComponent } from './importador-cliente/importador-cliente.component';
import { ImportadorFornecedorComponent } from './importador-fornecedor/importador-fornecedor.component';
import { ImportadorResultComponent } from './importador-result/importador-result.component';



@NgModule({
  declarations: [
    ImportadorListComponent,
    ImportadorClienteComponent,
    ImportadorFornecedorComponent,
    ImportadorResultComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ImportadorRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class ImportadorModule { }
