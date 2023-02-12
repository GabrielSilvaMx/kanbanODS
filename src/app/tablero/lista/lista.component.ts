import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListaSchema, TareaSchema } from 'src/app/core/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @Input()
  list: ListaSchema; //  operador de aserción no nulo en TypeScript

  @Output() editTask: EventEmitter<TareaSchema> = new EventEmitter();

  constructor(public tareasService: TareasService) {
    this.list = {
      id: '',
      name: '',
      tasks: []
    }
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  
  handleEdit(task: TareaSchema) {
    if (this.list) {
      task.listId = this.list.id;
      this.editTask.emit(task);
    }
  }

 
}
