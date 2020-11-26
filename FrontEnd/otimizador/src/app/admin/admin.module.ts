import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { StarterComponent } from './starter/starter.component';
import { FooterComponent } from './menu/footer/footer.component';
import { ContentComponent } from './menu/content/content.component';
import { MenuSidebarComponent } from './menu/menu-sidebar/menu-sidebar.component';
import { MenuNavbarComponent } from './menu/menu-navbar/menu-navbar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogListComponent } from './logs/log-list/log-list.component';



@NgModule({
  declarations: [
    MenuNavbarComponent,
    MenuSidebarComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    StarterComponent,
    LogListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ]
})
export class AdminModule { }
