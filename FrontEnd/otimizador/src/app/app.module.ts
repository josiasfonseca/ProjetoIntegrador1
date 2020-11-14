import { NgxSpinnerModule } from 'ngx-spinner';
import { StarterComponent } from './admin/starter/starter.component';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptors';
import { TokenInterceptor } from './interceptors/token.interceptors';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './admin/menu/footer/footer.component';
import { ContentComponent } from './admin/menu/content/content.component';
import { MenuSidebarComponent } from './admin/menu/menu-sidebar/menu-sidebar.component';
import { ShareModule } from './share/share.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { AdminModule } from './admin/admin.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ShareModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AuthModule,
    AdminModule,
    NgSelectModule,
    FormsModule,
    TooltipModule.forRoot()
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
