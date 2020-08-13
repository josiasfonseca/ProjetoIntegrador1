import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ControleService } from './../../services/controle.service';
import { Controle } from './../../model/controle';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private service: ControleService,
    private serviceEmpresa: EmpresaService,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idEmpresa == null) {
      this.onBack();
    } else {
      this.buscaEmpresa(this.idEmpresa);
      this.atualizaLista();
    }

  }

  atualizaLista() {
    // Recebe uma lista de controles de forma assíncrona
    this.service.listaPorEmpresa(this.idEmpresa).subscribe(
      (dados: any) => {
        if (dados.total > 0) {
          this.controles = dados.data;
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
    console.log(idControle);
    this.router.navigate([`/observacoes/${idControle}`]);
  }
}
