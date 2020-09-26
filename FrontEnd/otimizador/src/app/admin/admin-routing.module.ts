import { StarterComponent } from './starter/starter.component';
import { AuthGuard } from './../guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '' , component: StarterComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'empresas', loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
      { path: 'controles', loadChildren: () => import('./controles/controles.module').then(m => m.ControlesModule) },
      { path: 'observacoes', loadChildren: () => import('./observacoes/observacoes.module').then(m => m.ObservacoesModule) },
      { path: 'importador', loadChildren: () => import('./importador/importador.module').then(m => m.ImportadorModule) },
      { path: 'relatorios', loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule) },
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
