import { Component, OnInit } from '@angular/core';
import { ApiService} from './../../core';
import { ListaSchema, TareaSchema } from 'src/app/core/models';
import { TareasService } from 'src/app/core/services/tareas.service';
import { UserService } from 'src/app/core/services/user.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskList?: TareaSchema[];
  content: string = '';
  currentUser: any;
  currenToken: string = '';

  constructor( private apiService: ApiService,
               private tareasService: TareasService,
               private userService: UserService,
               private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.currenToken = this.token.getToken();
    console.log("home::ngOnInit::getPublicContent::token ="+this.currenToken);
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
        console.log("home::ngOnInit::getPublicContent::data ="+ this.content)
        
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.getPrioritiesTask();
    
  }
  
  getPrioritiesTask(PriorityType: string = ''): void {
    this.tareasService.getBoardList$
      .subscribe(
        (response: ListaSchema[]) => {
          const lists = response;
          let tasks: TareaSchema[] = [];
          lists.map((element: ListaSchema )=> {
            element.tasks.map((task: TareaSchema) => {
              if(task.priority == PriorityType){
                tasks.push(task)
              }
            });
          });
          this.taskList = tasks;
        },
        (error: string) => (console.log('Ups! we have an error: ', error))
    );
  }
}
