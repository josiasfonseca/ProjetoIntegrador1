import { NgxPaginationModule } from 'ngx-pagination';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RelatorioGeralComponent } from './controle/relatorio-geral/relatorio-geral.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RelatorioGeralComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
