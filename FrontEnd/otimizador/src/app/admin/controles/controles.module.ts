import { NgxSpinnerModule } from 'ngx-spinner';
import { ShareModule } from './../../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlesRoutingModule } from './controles-routing.module';
import { ControlesListComponent } from './controles-list/controles-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlesFormComponent } from './controles-form/controles-form.component';



@NgModule({
  declarations: [
    ControlesListComponent,
    ControlesFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ControlesRoutingModule,
    FormsModule,
    ShareModule,
    NgxSpinnerModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
})
export class ControlesModule { }
