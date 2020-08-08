import { HomeComponent } from './home/home.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'controles', loadChildren: () => import('./controles/controles.module').then(m => m.ControlesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
