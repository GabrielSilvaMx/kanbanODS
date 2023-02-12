import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { take } from 'rxjs/operators';

import { ListaSchema, TareaSchema } from 'src/app/core/models';
import { TareasService } from 'src/app/core/services/tareas.service';
import { generateUniqueId } from 'src/app/frontend/utils';

type DropdownObject = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss']
})
export class CrearTareaComponent implements OnInit {  
  
  @ViewChild('autosize') autosize?: CdkTextareaAutosize;
  @Input() connectedOverlay?: CdkConnectedOverlay;
  @Input() task: TareaSchema;
  @Input() listId: string = '';
  formText: string = '';

  crearTarea: FormGroup;
  selectedPriority: string = '';
 
  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgente' },
    { value: 'moderate', viewValue: 'Moderado' },
    { value: 'low', viewValue: 'Bajo' },
  ];

  constructor(private fb: FormBuilder, private _ngZone: NgZone, private tareasService: TareasService) {
    this.task = {
      id: '',
      description: '',
      date: '',
      priority: '',
      listId: ''
    }; 
    this.crearTarea = fb.group({
      date: [new Date(), Validators.required],
      priority: ['urgent', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.setForm();
    this.selectedPriority = '';
    
    if (this.task && this.task.id &&  this.task.id.length > 0) {
      this.setValuesOnForm(this.task);
      this.formText = 'Editar';
      this.selectedPriority = this.task.priority;
    } else {
      this.formText = 'Crear';
    }
    console.log("Modo: " + this.formText);
  }
  
  setForm(): void {
    this.crearTarea = this.fb.group({
      date: [new Date(), Validators.required],
      priority: ['urgent', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFormAdd(form: TareaSchema): void {
    if (this.crearTarea.valid && this.task && !this.task.id) {
      console.log('valido');
      this.tareasService.addTask(form);
      this.close();
    } else if (this.task && this.listId) {
        console.log('editada');
        const findPriority = this.priorities.find(
          (element) => form.priority === element.value
        );
        form.id = this.task.id;
        form.priority = !findPriority ? this.task.priority : form.priority;
        form.date = new Date(form.date);
        if (form.priority) {
          this.tareasService.updateTask(form, this.listId);
        }
        this.close();
    }
  }
  
  setValuesOnForm(form: TareaSchema): void {
    this.crearTarea.setValue({
      date: new Date(form.date),
      priority: form.priority,
      description: form.description,
    });
  }

  triggerREsize() {
    this._ngZone.onStable
    .pipe(take(1))
    .subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  close():void 
  {
    this.connectedOverlay?.overlayRef.detach();
  }

}


  

  