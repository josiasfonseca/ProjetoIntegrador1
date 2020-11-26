import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from './../../../services/empresa.service';
import { LayoutService } from './../../../services/layout.service';
import { Empresa } from './../../../model/empresa';
import { LayoutRecebimento } from './../../../model/layout-recebimento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-recebimento-list',
  templateUrl: './layout-recebimento-list.component.html',
  styleUrls: ['./layout-recebimento-list.component.css']
})
export class LayoutRecebimentoListComponent implements OnInit {

  idEmpresa: number;
  layout: LayoutRecebimento[];
  empresa: Empresa;

  constructor(
    private layoutRecebimentoService: LayoutService,
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

    this.layoutRecebimentoService.listaLayoutRecebimentos(this.idEmpresa)
    .subscribe((resp: LayoutRecebimento[]) => {
      this.layout = resp;
    });
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  details(idLayoutRecebimento: number) {
    this.router.navigate(['/layouts/recebimentos/detalhes/' + idLayoutRecebimento]);
  }

  novoLayoutRecebimento() {
    this.router.navigate(['/layouts/recebimentos/' + this.idEmpresa + '/novo']);
  }

}
