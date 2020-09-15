import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Empresa } from './../../../model/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {

  empresas: Empresa[];
  totalRegistros: number;

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
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.atualizaLista();
  }

  atualizaLista(paginaAtual = 1) {
    // Recebe uma lista de empresas de forma assíncrona
    this.spinner.show();
    this.service.list(paginaAtual).subscribe(
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
