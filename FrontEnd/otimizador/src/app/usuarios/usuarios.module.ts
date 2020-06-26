import { ShareModule } from './../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from './usuarios.service';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UsuariosListComponent,
    UsuariosFormComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class UsuariosModule { }
