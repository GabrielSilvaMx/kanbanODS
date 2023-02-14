import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
// Modulos para el tablero Kanban
import { CoreModule } from './core/core.module';
import { FrontendModule } from './frontend/frontend.module';
import { TableroModule } from './tablero/tablero.module';
import { HomeModule } from './home/home.module';

import { authInterceptorProviders } from './core/helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,    
    CoreModule,
    FrontendModule,
    TableroModule,
    HomeModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
