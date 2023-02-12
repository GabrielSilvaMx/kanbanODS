import { Component, OnInit } from '@angular/core';
import { ApiService} from './../../core';
import { ListaSchema, TareaSchema } from 'src/app/core/models';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskList?: TareaSchema[];

  constructor( private apiService: ApiService,
               private tareasService: TareasService) { }

  ngOnInit(): void {
    this.getPrioritiesTask();
  }
  
  getPrioritiesTask(priorityType: string = ''): void {
    this.tareasService.getBoardList$
      .subscribe(
        {
          
        }
        /* (response: ListaSchema[]) => {
          const lists = response;
          let tasks: TareaSchema[] = [];
          lists.map((element: ListaSchema )=> {
            element.tasks.map((task: TareaSchema) => {
              if(task.priority == priorityType){
                tasks.push(task)
              }
            });
          });
          this.taskList = tasks;
        },
        error => (console.log('Se encontró un error: ', error)) */
    );
  }
}
