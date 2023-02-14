import { Component, OnInit } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

import { ApiService } from './../../core';
import { ListaSchema, TareaSchema } from 'src/app/core/models';
import { TareasService } from 'src/app/core/services/tareas.service';

const initialValue = {
  id: '',
  description: '',
  date: '',
  priority: '',
  listId: ''
};

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})

export class TableroComponent implements OnInit {
  lists: ListaSchema[];
  task: TareaSchema;
  listId: string = '';

  isOverlayDisplayed = false;
  readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'start', originY: 'top', overlayX: 'start',  overlayY: 'top'}
    ]
  };

  constructor(private apiService: ApiService, private tareasService: TareasService) {
    this.lists = [];
    this.task = initialValue;
  }

  ngOnInit(): void {
    //this.getDataList();
    this.getDataStored();
  }

  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => (this.lists = response),
      (error: string) => console.log('Se ha encontrado un error: ', error)
    );
    /*this.apiService.getApi().subscribe(
      (response: any) => (this.lists = response['list']),
      (error: string) => console.log('Se ha encontrado un error: ', error)
    );
    */
  }

  getDataStored(): void {
    this.tareasService.getBoardList$
      .subscribe(
        (response: any) => this.lists = response,
        (error: string) => (console.log('Se ha encontrado un error: ', error))
    );
  }

  displayOverlay(event?: TareaSchema): void {
    this.isOverlayDisplayed = true;
    if (!!event) {
      if (event.listId) {
        this.listId = event.listId;
      } else 
        this.listId = '';

      this.task = {
        date: event.date,
        id: event.id,
        description: event.description,
        priority: event.priority,
        listId: this.listId
      };
      
    } else {
      this.task = initialValue;
    }
  }


  hideOverlay(): void {
  this.isOverlayDisplayed = false;
  }
  
}