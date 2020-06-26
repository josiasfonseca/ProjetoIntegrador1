import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AlertModalService } from './alert-modal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { HttpClientModule } from '@angular/common/http';
import { InputControlErroComponent } from './input-control-erro/input-control-erro.component';



@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent, InputFieldComponent, InputControlErroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports: [
    AlertModalComponent, InputFieldComponent, InputControlErroComponent
  ],
  entryComponents: [AlertModalComponent, ConfirmModalComponent]
})
export class ShareModule { }
