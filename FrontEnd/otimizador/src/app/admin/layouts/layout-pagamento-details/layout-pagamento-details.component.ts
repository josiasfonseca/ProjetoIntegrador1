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

  constructor(
    private layoutPagamentoService: LayoutService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idLayoutPagamento = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idLayoutPagamento == null) {
      this.onBack();
    } else {
      this.atualizaLista();
    }
  }

  atualizaLista() {
    this.layoutPagamentoService.listaLayoutPagamento(this.idLayoutPagamento)
    .subscribe((resp: LayoutPagamento[]) => {
      this.layout = resp;
      const array = this.layout[0].layout.campos.split(';');
      array.forEach(elemento => {
        const dados = elemento.split('=');
        const campo = dados[0];
        const posicao = dados[1];
        this.listaLayout.push([campo, posicao]);
      });
      console.log(this.listaLayout);
    });
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onEdit(idLayoutPagamento: number) {
    this.router.navigate(['/layouts/pagamentos/' + idLayoutPagamento + '/editar']);
  }
}
