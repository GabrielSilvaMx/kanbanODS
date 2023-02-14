import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../';

import { ListaSchema, TareaSchema } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private readonly boardList = new BehaviorSubject<ListaSchema[]>([]);
  readonly list$ = this.boardList.asObservable();
  readonly getBoardList$ = this.list$.pipe(map((list) => list));

  constructor(private apiService: ApiService) {
    this.loadInitialData();
  }

  /* Load initial data to render in a component */
  loadInitialData(): any {
    return this.apiService.getApi().subscribe((response: any) => {
      if (!!response) {
        this.boardList.next(response['list']);
      }
    });
  }

  /* getter list of Board */
  get list(): ListaSchema[] {
    return this.boardList.getValue();
  }

  /* setter list of Board */
  set list(value: ListaSchema[]) {
    this.boardList.next(value);
  }

  /* Agregar nueva tarjeta al tablero */
  addTask(data: TareaSchema): void {
    const card = data;
    const elementsIndex = this.list.findIndex(
      (element) => element.id === '1'
    );
    this.list[elementsIndex].tasks.push(card);
  }

  /* Editar una tarjeta del tablero */
  updateTask(data: TareaSchema, listId: string): void {
    if (data) {
      const elementsIndex = this.list.findIndex(
        (element) => element.id === listId
      );
      const task = this.list[elementsIndex].tasks.map((element) => {
        if (element.id === data.id) {
          element.date = new Date(data.date);
          element.description = data.description;
          element.priority = data.priority;
        }
        return element;
      });
    }
  }

  /* Eliminar una tarjeta del tablero  */
  removeTask(dataId: string, list: ListaSchema): void {
    const elementsIndex = this.list.findIndex(
      (element) => element.id == list.id
    );
    const tasks = this.list[elementsIndex].tasks.filter(
      (task) => task.id !== dataId
    );
    this.list[elementsIndex].tasks = tasks;
  }

}