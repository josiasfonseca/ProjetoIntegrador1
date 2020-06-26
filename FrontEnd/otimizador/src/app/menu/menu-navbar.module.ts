import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuNavbarRoutingModule } from './menu-navbar-routing.module';


@NgModule({
  declarations: [
    MenuNavbarComponent
  ],
  imports: [
    CommonModule,
    MenuNavbarRoutingModule
  ]
})
export class MenuNavbarModule { }
