import { Empresa } from './../../../model/empresa';
import { EmpresaService } from './../../../services/empresa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutPagamento } from 'src/app/model/layout-pagamento';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from './../../../services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-pagamento-list',
  templateUrl: './layout-pagamento-list.component.html',
  styleUrls: ['./layout-pagamento-list.component.css']
})
export class LayoutPagamentoListComponent implements OnInit {

  idEmpresa: number;
  layout: LayoutPagamento[];
  empresa: Empresa;

  constructor(
    private layoutPagamentoService: LayoutService,
    private serviceEmpresa: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idEmpresa == null) {
      this.onBack();
    } else {
      this.atualizaLista();
    }
  }

  atualizaLista() {
    this.spinner.show();
    this.serviceEmpresa.listPorId(this.idEmpresa)
    .subscribe( (dados: any) => {
      this.empresa = dados;
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
      this.onBack();
    });

    this.layoutPagamentoService.listaLayoutPagamentos(this.idEmpresa)
    .subscribe((resp: LayoutPagamento[]) => {
      this.layout = resp;
      console.log(this.layout);
    });
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  details(idLayoutPagamento: number) {
    this.router.navigate(['/layouts/pagamentos/detalhes/' + idLayoutPagamento]);
  }

  novoLayoutPagamento() {
    this.router.navigate(['/layouts/pagamentos/' + this.idEmpresa + '/novo']);
  }
}
