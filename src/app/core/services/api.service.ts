import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const ODS_API = environment.apiODS + '/api';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

 private _jsonURL = 'assets/list.json';

 private apiRoot: string = 'https://run.mocky.io/v3/7841d1af-e8d5-446a-bac5-3506fdd05659';
  
  constructor(private http: HttpClient) { 
    this.getJSON().subscribe(data => {
      console.log(data);
     });
  }

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
          cardID : "BEDU-RECICLA-003",
          date: "2023-02-16",
          priority: "low",
          transicion: "working",
          estado: "progress",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          tiempoEstimado: "1 semana"
    }, httpOptions);
  }

  deleteApi(idTarea:string='') {
    return this.http
      .delete(ODS_API + '/tareas/'+idTarea, httpOptions);
  }

  /* Handle request error */
  private handleError(res: HttpErrorResponse){
    return observableThrowError(res.error || 'Server error');
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

}
