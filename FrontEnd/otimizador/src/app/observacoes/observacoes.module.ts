import { NgxSpinnerModule } from 'ngx-spinner';
import { ShareModule } from './../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ObservacoesRoutingModule } from './observacoes-routing.module';
import { ObservacoesListComponent } from './observacoes-list/observacoes-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservacoesFormComponent } from './observacoes-form/observacoes-form.component';



@NgModule({
  declarations: [
    ObservacoesListComponent,
    ObservacoesFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    NgxSpinnerModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ObservacoesRoutingModule
  ]
})
export class ObservacoesModule { }
