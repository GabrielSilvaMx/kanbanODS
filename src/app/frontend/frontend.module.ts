import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// Debemos agregar el "RouterModule", para que funcionen las directivas en el componente header.
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';

const declarables = [
  HeaderComponent,
  FooterComponent
];
@NgModule({
  declarations: [declarables, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialCdkModule
  ],
  exports: declarables
})
export class FrontendModule { }
