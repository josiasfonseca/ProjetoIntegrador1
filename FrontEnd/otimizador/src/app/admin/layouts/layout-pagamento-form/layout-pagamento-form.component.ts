import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from './../../../services/layout.service';
import { LayoutPagamento } from 'src/app/model/layout-pagamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-pagamento-form',
  templateUrl: './layout-pagamento-form.component.html',
  styleUrls: ['./layout-pagamento-form.component.css']
})
export class LayoutPagamentoFormComponent implements OnInit {

  idLayoutPagamento: number;
  layout: LayoutPagamento[];
  listaLayout = [];
  formulario: FormGroup;

  constructor(
    private layoutPagamentoService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.idLayoutPagamento = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;

    this.formulario = this.fb.group({
      posicao: [null, Validators.required],
    });

    if (this.idLayoutPagamento == null) {
      this.onBack();
    } else {
      this.atualizaLista();
    }
  }

  preencherCampos() {
    // this.formulario.get('posicao').setValue(this.listaLayout[0][5]);
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
        this.preencherCampos();
      });
      console.log(this.listaLayout);
    });
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
