import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tablero',
    pathMatch: 'full'
  },
  {
    path: 'tablero',
    loadChildren:() => import('./tablero/tablero.module').then(m=>m.TableroModule)
  },
  {
    path: 'home',
    loadChildren:()=> import('./home/home.module').then(m=>m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
