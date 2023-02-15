import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './frontend/components/register/register.component';
import { LoginComponent } from './frontend/components/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './frontend/components/profile/profile.component';
import { BoardUserComponent } from './frontend/board/board-user/board-user.component';
import { BoardModeratorComponent } from './frontend/board/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './frontend/board/board-admin/board-admin.component';
import { NotfoundComponent } from './frontend/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tablero',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  {
    path: 'tablero',
    loadChildren:() => import('./tablero/tablero.module').then(m=>m.TableroModule)
  },
  {
    path: 'home',
    loadChildren:()=> import('./home/home.module').then(m=>m.HomeModule)
  },
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
