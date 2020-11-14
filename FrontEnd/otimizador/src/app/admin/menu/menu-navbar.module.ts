import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuNavbarRoutingModule } from './menu-navbar-routing.module';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MenuNavbarRoutingModule
  ]
})
export class MenuNavbarModule { }
