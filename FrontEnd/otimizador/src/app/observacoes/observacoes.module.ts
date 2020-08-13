import { ShareModule } from './../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ObservacoesRoutingModule } from './observacoes-routing.module';
import { ObservacoesListComponent } from './observacoes-list/observacoes-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ObservacoesListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ObservacoesRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class ObservacoesModule { }
