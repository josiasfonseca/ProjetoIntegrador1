import { take, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Empresa } from './../../../model/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {

  empresas: Empresa[];
  totalRegistros: number;
  campoBusca = '';
  timer = null;
  empresaSelecionada;

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

  onNew() {
    this.router.navigate(['empresas/novo']);
  }

  // Funcão redirecionará o usuário para a tela de edição de empresa
  onEdit(id: number) {
    if (id != null ) {
      this.router.navigate(['empresas/' + id]);
    }
  }


  onDelete(empresa: Empresa) {
    this.empresaSelecionada = empresa;
    const result$ =
    this.alertService.showConfirm('Exclusão', 'Deseja excluir essa empresa ?', null, null, `${empresa.id_empresa} - ${empresa.nome} `);
    result$.asObservable()
    .pipe(
      take(1),
      switchMap( result => result ? this.service.deleteEmpresa(empresa.id_empresa) : EMPTY))
      .subscribe(dados => {
        this.alertService.showAlertSucess('Empresa excluída com sucesso!');
        setTimeout(() => {
          this.alertService.closeAlert();
          this.atualizaLista(this.paginaAtual);
        }, 1000);
      }, error => {
        this.alertService.showAlertDanger('Erro na exclusão desta empresa!');
      });
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
