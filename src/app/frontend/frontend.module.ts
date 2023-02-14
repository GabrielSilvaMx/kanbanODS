import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
// Debemos agregar el "RouterModule", para que funcionen las directivas en el componente header.
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';

// Módulos para el login
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './board/board-admin/board-admin.component';
import { BoardModeratorComponent } from './board/board-moderator/board-moderator.component';
import { BoardUserComponent } from './board/board-user/board-user.component';

const declarables = [
  HeaderComponent,
  FooterComponent
];
@NgModule({
  declarations: [
    declarables, 
    ModalComponent, 
    LoginComponent, 
    RegisterComponent, 
    ProfileComponent, 
    BoardAdminComponent, 
    BoardModeratorComponent, 
    BoardUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialCdkModule,
    HttpClientModule,
    FormsModule
  ],
  exports: declarables
})
export class FrontendModule { }
