import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/frontend/components/modal/modal.component';

import { ListaSchema, TareaSchema } from 'src/app/core/models';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})

export class TareasComponent  implements OnInit {
  @Input() task: TareaSchema;
  // al presionar el icono podamos editar nuestra tarea emitiendo el evento al padre
  // y queremos llamar al overlay mostrando la información de la tarea seleccionada
  @Output() editTask: EventEmitter<TareaSchema> = new EventEmitter();
  @Input() list: ListaSchema;

  constructor(public dialog: MatDialog, public tareasService: TareasService) { 
    this.task = {
        id: '',
        description: '',
        date: '',
        priority: '',
        listId: ''
    }; 
    this.list = {
      id: '',
      name: '',
      tasks: []
    }
}

  ngOnInit(): void {}

  handleEditTask(task: TareaSchema) {
    console.log('handle! ');
    this.editTask.emit(task);
  }

  removeTask(taskId: string): void {    
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (this.list) {
        this.tareasService.removeTask(taskId, this.list);
      }
      console.log('Eliminar tarea ', result);
    });
  }

}
