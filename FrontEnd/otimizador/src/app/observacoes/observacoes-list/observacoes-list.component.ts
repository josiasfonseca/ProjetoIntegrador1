import { Observacao } from './../../model/observacao';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { EmpresaService } from './../../services/empresa.service';
import { ObservacaoService } from './../../services/observacao.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-observacoes-list',
  templateUrl: './observacoes-list.component.html',
  styleUrls: ['./observacoes-list.component.css']
})
export class ObservacoesListComponent implements OnInit {

  empresa: Empresa;
  observacoes: Observacao[];
  idControle: number;
  totalRegistros: number;

  constructor(
    private service: ObservacaoService,
    private serviceControle: ControleService,
    private serviceEmpresa: EmpresaService,
    private fb: FormBuilder,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idControle = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    this.atualizaLista();
  }

  buscaEmpresa(id: number = null) {
    if (id == null) {
      return;
    }
    this.serviceEmpresa.listPorId(id)
    .subscribe( (dados: any) => {
      this.empresa = dados;
    });
  }

  atualizaLista() {
    // Recebe uma lista de controles de forma assíncrona
    this.service.listPorControle(this.idControle).subscribe(
      (dados: any) => {
        if (dados.total > 0) {
          this.observacoes = dados.data;
          console.log(this.observacoes);
          this.totalRegistros = dados.total;
        } else {
          this.alertService.showAlertDanger('Erro ao carregar lista!');
          setTimeout(() => {
            this.alertService.closeAlert();
            this.onBack();
          }, 2000);
        }
      }, error => {
        this.alertService.showAlertDanger('Erro ao carregar lista!');
        setTimeout(() => {
          this.onBack();
        }, 2000);
      }
    );
  }

  onBack() {
    this.router.navigate(['../../controles/' + this.observacoes[0].controles.empresa_id], { relativeTo: this.route });
  }
}
