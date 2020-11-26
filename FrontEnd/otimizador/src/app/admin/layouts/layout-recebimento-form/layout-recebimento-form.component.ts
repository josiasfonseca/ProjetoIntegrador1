import { AlertModalService } from './../../../share/alert-modal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from './../../../services/layout.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutRecebimento } from './../../../model/layout-recebimento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-recebimento-form',
  templateUrl: './layout-recebimento-form.component.html',
  styleUrls: ['./layout-recebimento-form.component.css']
})
export class LayoutRecebimentoFormComponent implements OnInit {

  idLayoutRecebimento: number;
  idEmpresa: number;
  layout: LayoutRecebimento[];
  listaLayout = [];
  formulario: FormGroup;
  editando = false;

  constructor(
    private layoutRecebimentoService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      descricao: [null, Validators.required],
      cod_cliente: [null, Validators.required],
      nome_cliente: [null, Validators.required],
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
    // Se for edição preenche os campos com os dados do layout
    const url: string = this.router.url;
    if (url.indexOf('novo') === -1) {
      this.idLayoutRecebimento = this.route.snapshot.params.id
        ? parseInt(this.route.snapshot.params.id, 10)
        : null;
      this.editando = true;
      // Busca no serviço o layout pelo id
      this.atualizaLista();
    } else if (url.indexOf('editar') === -1) {
      this.idLayoutRecebimento = null;
      this.idEmpresa = this.route.snapshot.params.id
        ? parseInt(this.route.snapshot.params.id, 10)
        : null;
   }

  }


  preencherCampos() {
    this.formulario.get('descricao').setValue(this.listaLayout[0][1]);
    this.formulario.get('cod_cliente').setValue(this.listaLayout[1][1]);
    this.formulario.get('nome_cliente').setValue(this.listaLayout[2][1]);
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
    this.spinner.show();
    this.layoutRecebimentoService
      .listaLayoutRecebimento(this.idLayoutRecebimento)
      .subscribe((resp: LayoutRecebimento[]) => {
        this.layout = resp;
        this.idEmpresa = this.layout[0].empresa_id;
        this.listaLayout.push(['descricao', this.layout[0].descricao]);
        const array = this.layout[0].layout.campos.split(';');
        array.forEach((elemento) => {
          const dados = elemento.split('=');
          const campo = dados[0];
          const posicao = dados[1];
          this.listaLayout.push([campo, posicao]);
        });
        this.preencherCampos();
        this.spinner.hide();
      });
  }

  gravar() {
    this.layoutRecebimentoService
      .gravarLayoutRecebimento(this.idLayoutRecebimento, this.idEmpresa, this.formulario.value)
      .subscribe((resp) => {
        this.alertService.showAlertSucess('Layout gravado com sucesso!');
        setTimeout(() => {
          this.alertService.closeAlert();
          this.router.navigate(['/layouts/recebimentos/' + this.idEmpresa]);
        }, 2000);
      }, (erro: any) => {
        this.alertService.showAlertSucess('Erro ao gravar layout. ' + erro);
        setTimeout(() => {
          this.alertService.closeAlert();
        }, 2000);
      });
  }

  onBack() {
    if (this.idLayoutRecebimento) {
      this.router.navigate(['../../detalhes/' + this.idLayoutRecebimento], {
        relativeTo: this.route,
      });
    } else {
        this.router.navigate(['../../' + this.idEmpresa], {
          relativeTo: this.route,
        });
    }
  }
}
