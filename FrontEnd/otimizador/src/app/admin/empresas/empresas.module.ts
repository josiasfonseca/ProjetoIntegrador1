import { ShareModule } from './../../share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { EmpresasListComponent } from './empresas-list/empresas-list.component';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    EmpresasListComponent,
    EmpresasFormComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    EmpresasRoutingModule,
    FormsModule,
    HttpClientModule,
    ShareModule,
    NgSelectModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class EmpresasModule { }
