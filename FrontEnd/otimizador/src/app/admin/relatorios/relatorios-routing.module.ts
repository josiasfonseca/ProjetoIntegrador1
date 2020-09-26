import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioGeralComponent } from './controle/relatorio-geral/relatorio-geral.component';

const routes: Routes = [
  { path: 'controle',
    children: [
      { path: 'relatorio-geral', component: RelatorioGeralComponent }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class RelatoriosRoutingModule { }
