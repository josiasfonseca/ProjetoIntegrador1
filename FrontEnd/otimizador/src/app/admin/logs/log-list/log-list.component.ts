import { LogService } from './../../../services/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalService } from './../../../share/alert-modal.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  timer = null;
  campoBusca = '';
  totalRegistros: number;
  logs: [];

  paginaAtual: number;
  @Input() id: string;
  @Input() maxSize: 20;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;


  constructor(
    private http: LogService,
    private router: Router,
    private route: ActivatedRoute,
    private spiner: NgxSpinnerService,
    private alert: AlertModalService
  ) { }

  ngOnInit() {
    this.atualizaLista();
  }

  atualizaLista(paginaAtual = 1) {
    this.spiner.show();
    this.http.list(paginaAtual, this.campoBusca)
    .subscribe(
      (res: any) => {
        this.logs = res.data;
        console.log(res);
        this.totalRegistros = res.total;
        this.paginaAtual = res.current_page;
        this.spiner.hide();
      }, (error: any) => {
        this.alert.showAlertDanger('Erro ao buscar dados!');
        this.spiner.hide();
      }
    );
  }

  buscaDados() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.atualizaLista();
    }, 500);
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
