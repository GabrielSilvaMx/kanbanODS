import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const ODS_API = 'http://localhost:8084/api';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   //api with one task
 private apiRoot: string = 'https://run.mocky.io/v3/26045374-863c-469d-85c4-51ea1135ce8a';

 //api without any task
 //private apiRoot: string = 'https://run.mocky.io/v3/7841d1af-e8d5-446a-bac5-3506fdd05659';

 // api with many task
 //private apiRoot: string = 'https://run.mocky.io/v3/0933ddef-c9bf-4f26-8ddf-77990fb490cb';

 // private apiRoot: string = 'http://localhost:8084/api';
  
  constructor(private http: HttpClient) { }

 /* Get Api Data from mock service */
  getApi() {
    return this.http
      .get<Array<{}>>(this.apiRoot)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getApiODS() {
    return this.http
      .get<Array<{}>>(ODS_API + '/tareas/proyecto/1/usuario/2/tablero')
      .pipe(map(data => data), catchError(this.handleError));
  }

  postApi() {
    return this.http
      .post(ODS_API + '/tareas/proyecto/1/usuario/2', {
          cardID : "CARD-BEDU-2023-010",
          date: "2023-02-19",
          priority: "urgent",
          transicion: "working",
          estado: "progress",
          description: "a) Realizaré una encuesta al personal para ver si tienen algún equipo que ya no les sirva.",
          tiempoEstimado: "1 semana"
    }, httpOptions);
  }

  /* Handle request error */
  private handleError(res: HttpErrorResponse){
    return observableThrowError(res.error || 'Server error');
  }
}
