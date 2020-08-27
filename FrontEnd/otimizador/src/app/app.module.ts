import { FooterComponent } from './menu/footer/footer.component';
import { ContentComponent } from './menu/content/content.component';
import { MenuSidebarComponent } from './menu/menu-sidebar/menu-sidebar.component';
import { ShareModule } from './share/share.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuNavbarComponent } from './menu/menu-navbar/menu-navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpresasListComponent } from './empresas/empresas-list/empresas-list.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavbarComponent,
    HomeComponent,
    EmpresasListComponent,
    MenuSidebarComponent,
    ContentComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
