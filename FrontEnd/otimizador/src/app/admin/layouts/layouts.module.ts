import { ShareModule } from './../../share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsComponent } from './layouts/layouts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutPagamentoComponent } from './layout-pagamento/layout-pagamento.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutsComponent,
    LayoutPagamentoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    NgxSpinnerModule,
    LayoutsRoutingModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class LayoutsModule { }
