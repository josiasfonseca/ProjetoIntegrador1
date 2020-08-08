import { ShareModule } from './../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlesRoutingModule } from './controles-routing.module';
import { ControlesListComponent } from './controles-list/controles-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ControlesListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ControlesRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
})
export class ControlesModule { }
