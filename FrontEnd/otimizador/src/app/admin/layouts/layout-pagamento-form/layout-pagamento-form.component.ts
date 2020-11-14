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
  editando = false;
  constructor(
    private layoutPagamentoService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.idLayoutPagamento = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;

    this.formulario = this.fb.group({
      descricao: [null, Validators.required],
      cod_fornecedor: [null, Validators.required],
      nome_fornecedor: [null, Validators.required],
      data: [null, Validators.required],
      cnpj: [null, Validators.required],
      valor_juros: [null, Validators.required],
      valor_desc: [null, Validators.required],
      total_pago: [null, Validators.required],
      valor_doc: [null, Validators.required],
      observacao: [null, Validators.required],
      numero_nota_fiscal: [null, Validators.required],
      banco: [null, Validators.required],
    });

    if (this.idLayoutPagamento == null) {
      this.onBack();
    } else {
      // Se for edição preenche os campos com os dados do layout
      const url: string = this.router.url;
      if (url.indexOf('novo') === -1) {
        this.editando = true;
        // Busca no serviço o layout pelo id
        this.atualizaLista();
      }
    }
  }

  preencherCampos() {
    this.formulario.get('descricao').setValue(this.listaLayout[0][1]);
    this.formulario.get('cod_fornecedor').setValue(this.listaLayout[1][1]);
    this.formulario.get('nome_fornecedor').setValue(this.listaLayout[2][1]);
    this.formulario.get('data').setValue(this.listaLayout[3][1]);
    this.formulario.get('cnpj').setValue(this.listaLayout[4][1]);
    this.formulario.get('valor_juros').setValue(this.listaLayout[5][1]);
    this.formulario.get('valor_desc').setValue(this.listaLayout[6][1]);
    this.formulario.get('total_pago').setValue(this.listaLayout[7][1]);
    this.formulario.get('valor_doc').setValue(this.listaLayout[8][1]);
    this.formulario.get('observacao').setValue(this.listaLayout[9][1]);
    this.formulario.get('numero_nota_fiscal').setValue(this.listaLayout[10][1]);
    this.formulario.get('banco').setValue(this.listaLayout[11][1]);
  }

  atualizaLista() {
    this.layoutPagamentoService.listaLayoutPagamento(this.idLayoutPagamento)
    .subscribe((resp: LayoutPagamento[]) => {
      this.layout = resp;
      console.log('Layout', this.layout);
      this.listaLayout.push(['descricao', this.layout[0].descricao]);
      const array = this.layout[0].layout.campos.split(';');
      array.forEach(elemento => {
        const dados = elemento.split('=');
        const campo = dados[0];
        const posicao = dados[1];
        this.listaLayout.push([campo, posicao]);
      });
      this.preencherCampos();
    });
  }

  gravar() {
    this.layoutPagamentoService.gravarLayoutPagamento(this.idLayoutPagamento, this.formulario.value)
    .subscribe( (resp => {
      console.log(resp);
    }));
  }

  onBack() {
    this.router.navigate(['../../' + this.layout[0].empresa_id], { relativeTo: this.route });
  }

}
