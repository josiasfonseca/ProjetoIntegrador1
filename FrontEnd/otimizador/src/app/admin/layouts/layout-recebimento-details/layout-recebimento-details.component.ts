import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from './../../../services/empresa.service';
import { LayoutService } from './../../../services/layout.service';
import { Empresa } from './../../../model/empresa';
import { LayoutRecebimento } from './../../../model/layout-recebimento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-recebimento-details',
  templateUrl: './layout-recebimento-details.component.html',
  styleUrls: ['./layout-recebimento-details.component.css']
})
export class LayoutRecebimentoDetailsComponent implements OnInit {

  idLayoutRecebimento: number;
  layout: LayoutRecebimento[];
  listaLayout = [];
  empresa: Empresa;

  constructor(
    private layoutRecebimentoService: LayoutService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.idLayoutRecebimento = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idLayoutRecebimento == null) {
      this.onBack();
    } else {
      this.spinner.show();
      this.atualizaLista();
      this.spinner.hide();
    }
  }

  atualizaLista() {
    this.layoutRecebimentoService.listaLayoutRecebimento(this.idLayoutRecebimento)
    .subscribe((resp: LayoutRecebimento[]) => {
      this.layout = resp;
      this.empresaService.listPorId(this.layout[0].empresa_id)
      .subscribe(resposta => this.empresa = resposta);
      const array = this.layout[0].layout.campos.split(';');
      this.listaLayout.push(['descricao', this.layout[0].descricao]);
      array.forEach(elemento => {
        const dados = elemento.split('=');
        const campo = dados[0];
        const posicao = dados[1];
        this.listaLayout.push([campo, posicao]);
      });
    });
  }

  onBack() {
    this.router.navigate(['../../' + this.empresa.id_empresa], { relativeTo: this.route });
  }

  onEdit(idLayoutPagamento: number) {
    this.router.navigate(['/layouts/recebimentos/' + idLayoutPagamento + '/editar']);
  }
}
