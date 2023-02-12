import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero/tablero.component';
import { ListaComponent } from './lista/lista.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';



@NgModule({
  declarations: [
    TableroComponent,
    ListaComponent,
    TareasComponent,
    CrearTareaComponent
  ],
  imports: [
    CommonModule,
    MaterialCdkModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}),
    TableroRoutingModule
  ]
})
export class TableroModule { }
