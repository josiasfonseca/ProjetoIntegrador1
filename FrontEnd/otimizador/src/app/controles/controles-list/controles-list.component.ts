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

  constructor(
    private service: ControleService,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.atualizaLista();
  }

  atualizaLista() {
    // Recebe uma lista de controles de forma assíncrona
    this.service.list().subscribe(
      (dados: any) => {
        this.controles = dados.data;
        console.log(this.controles);
        this.totalRegistros = dados.total;
      }, error => {
        this.alertService.showAlertDanger('Erro ao carregar lista!');
      }
    );
  }
}
