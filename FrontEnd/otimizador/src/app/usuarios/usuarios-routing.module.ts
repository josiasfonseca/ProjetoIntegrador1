import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: UsuariosListComponent},
  { path: 'novo', component: UsuariosFormComponent},
  { path: ':id', component: UsuariosFormComponent},
  { path: ':id/editar', component: UsuariosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
