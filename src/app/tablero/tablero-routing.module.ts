import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';

//  incluimos el componente en el enrutamiento.
const routes: Routes = [
  {
    path: '',
    component: TableroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroRoutingModule { }
