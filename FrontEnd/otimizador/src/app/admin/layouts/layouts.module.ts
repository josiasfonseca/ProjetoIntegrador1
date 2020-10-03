import { ShareModule } from './../../share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsComponent } from './layouts/layouts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutPagamentoDetailsComponent } from './layout-pagamento-details/layout-pagamento-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutPagamentoFormComponent } from './layout-pagamento-form/layout-pagamento-form.component';
import { LayoutPagamentoListComponent } from './layout-pagamento-list/layout-pagamento-list.component';


@NgModule({
  declarations: [
    LayoutsComponent,
    LayoutPagamentoDetailsComponent,
    LayoutPagamentoFormComponent,
    LayoutPagamentoListComponent
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
