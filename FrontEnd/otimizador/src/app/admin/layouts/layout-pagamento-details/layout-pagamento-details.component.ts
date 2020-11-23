import { NgxSpinnerService } from 'ngx-spinner';
import { EmpresaService } from './../../../services/empresa.service';
import { Empresa } from './../../../model/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';
import { Component, OnInit } from '@angular/core';
import { LayoutPagamento } from 'src/app/model/layout-pagamento';

@Component({
  selector: 'app-layout-pagamento',
  templateUrl: './layout-pagamento-details.component.html',
  styleUrls: ['./layout-pagamento-details.component.css']
})
export class LayoutPagamentoDetailsComponent implements OnInit {

  idLayoutPagamento: number;
  layout: LayoutPagamento[];
  listaLayout = [];
  empresa: Empresa;

  constructor(
    private layoutPagamentoService: LayoutService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.idLayoutPagamento = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idLayoutPagamento == null) {
      this.onBack();
    } else {
      this.spinner.show();
      this.atualizaLista();
      this.spinner.hide();
    }
  }

  atualizaLista() {
    this.layoutPagamentoService.listaLayoutPagamento(this.idLayoutPagamento)
    .subscribe((resp: LayoutPagamento[]) => {
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
    this.router.navigate(['/layouts/pagamentos/' + idLayoutPagamento + '/editar']);
  }
}
