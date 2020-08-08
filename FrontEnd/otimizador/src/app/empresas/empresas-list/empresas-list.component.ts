import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Empresa } from './../../model/empresa';
import { EmpresaService } from '../../services/empresa-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {

  empresas: Empresa[];
  totalRegistros: number;

  constructor(
    private service: EmpresaService,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.atualizaLista();
  }

  atualizaLista() {
    // Recebe uma lista de usuários de forma assíncrona
    this.service.list().subscribe(
      (dados: any) => {
        this.empresas = dados.data;
        this.totalRegistros = dados.total;
      }, error => {
        this.alertService.showAlertDanger('Erro ao carregar lista!');
      }
    );
  }

  controle(id) {
    console.log(id);
    this.router.navigate(['controles/id']);
  }

}
