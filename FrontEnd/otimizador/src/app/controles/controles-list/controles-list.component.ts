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
  totalRegistros: number;
  idUrl: number;

  constructor(
    private service: ControleService,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idUrl = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (!this.idUrl) {
      this.voltarPagina();
    }

    this.atualizaLista();
  }

  voltarPagina() {
    this.router.navigate(['/']);
  }
  atualizaLista() {

    // Recebe uma lista de controles de forma assíncrona
    this.service.listaPorEmpresa(this.idUrl).subscribe(
      (dados: any) => {
        this.controles = dados.data;
        this.totalRegistros = dados.total;
        }, error => {
        this.alertService.showAlertDanger('Erro ao carregar lista!');
        setTimeout(() => {
          this.voltarPagina();
        }, 2000);
      }
    );
  }

  editar(idControle: number) {
    this.router.navigate(['/controles/' + idControle + '/editar']);
  }

}
