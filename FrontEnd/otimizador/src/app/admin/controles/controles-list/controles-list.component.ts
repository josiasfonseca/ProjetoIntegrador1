import { EmpresaService } from './../../../services/empresa.service';
import { Empresa } from './../../../model/empresa';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ControleService } from './../../../services/controle.service';
import { Controle } from './../../../model/controle';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-controles-list',
  templateUrl: './controles-list.component.html',
  styleUrls: ['./controles-list.component.css']
})
export class ControlesListComponent implements OnInit {

  controles: Controle[];
  totalRegistros = 0;
  idEmpresa: number;
  empresa: Empresa;
  msgDados = '';
  constructor(
    private service: ControleService,
    private serviceEmpresa: EmpresaService,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idEmpresa == null) {
      this.onBack();
    } else {
      // this.buscaEmpresa(this.idEmpresa);
      this.atualizaLista();
    }

  }

  atualizaLista() {
    // Recebe uma lista de controles de forma assíncrona
    this.spinner.show();
    this.service.listaPorEmpresa(this.idEmpresa).subscribe(
      (dados: any) => {
        if (dados.total > 0) {
          this.controles = dados.data;
          this.totalRegistros = dados.total;
          this.empresa = this.controles[0].empresa;
          this.msgDados = '';
        } else {
          if (!this.empresa) {
            this.serviceEmpresa.listPorId(this.idEmpresa)
            .subscribe( (emps: any) => {
              this.empresa = emps;
            });
          }
          this.msgDados = 'Não encontrado controles!';
        }
        this.spinner.hide();
      }, error => {
        this.alertService.showAlertDanger('Erro ao carregar lista!');
        setTimeout(() => {
          this.spinner.hide();
          this.onBack();
        }, 2000);
      }
    );
  }

  editar(idControle: number) {
    this.router.navigate(['/controles/' + idControle + '/editar']);
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

  novo() {
    this.router.navigate(['/controles/novo/' + this.idEmpresa]);
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  verObservacoes(idControle: number) {
    this.router.navigate([`/observacoes/${idControle}`]);
  }

  editarObservacao(idControle: number) {
    this.router.navigate([`/observacoes/${idControle}/editar`]);
  }
}
