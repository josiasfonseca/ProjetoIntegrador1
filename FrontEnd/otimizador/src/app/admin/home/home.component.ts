import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalService } from './../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empresas: Empresa[];
  totalRegistros: number;
  campoBusca = '';
  timer = null;

  // Dados paginação
  paginaAtual: number;
  @Input() id: string;
  @Input() maxSize: 20;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  constructor(
    private service: EmpresaService,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.atualizaLista();

  }

  buscaDados() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.atualizaLista();
    }, 500);
  }

  atualizaLista(paginaAtual = 1) {
    // Recebe uma lista de empresas de forma assíncrona
    this.spinner.show();
    this.service.list(paginaAtual, this.campoBusca).subscribe(
      (dados: any) => {
        this.empresas = dados.data;
        this.totalRegistros = dados.total;
        this.paginaAtual = dados.current_page;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.alertService.showAlertDanger('Erro ao carregar lista!');
      }
    );
  }

  controle(id) {
    this.router.navigate(['controles/' + id]);
  }

  importador(id) {
    this.router.navigate(['importador/' + id]);
  }

  previous(paginaAtual: number) {
    this.atualizaLista(paginaAtual - 1);
  }

  next(paginaAtual: number) {
    this.atualizaLista(paginaAtual + 1);
  }

  setarPagina(pagina) {
  this.atualizaLista(pagina);
  }

}
