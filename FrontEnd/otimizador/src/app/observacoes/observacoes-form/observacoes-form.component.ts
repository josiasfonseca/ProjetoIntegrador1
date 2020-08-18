import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { EmpresaService } from './../../services/empresa.service';
import { ObservacaoService } from './../../services/observacao.service';
import { Empresa } from './../../model/empresa';
import { Observacao } from './../../model/observacao';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-observacoes-form',
  templateUrl: './observacoes-form.component.html',
  styleUrls: ['./observacoes-form.component.css']
})
export class ObservacoesFormComponent implements OnInit {

  observacao: Observacao;
  observacoes: Observacao;
  totalRegistros = 0;
  empresa: Empresa;
  idControle: number;
  formulario: FormGroup;
  msgErro = '';
  msgDados = '';

  constructor(
    private service: ObservacaoService,
    private serviceEmpresa: EmpresaService,
    private serviceControle: ControleService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.idControle = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;

    this.formulario = this.fb.group({
      mes_referencia: [null, Validators.required],
      observacao: [null],
      estado: [null, Validators.required],
    });


    if (this.idControle == null) {
      this.onBack();
    } else {
      this.atualizaLista();
    }

    this.formulario.get('mes_referencia').valueChanges
    .subscribe( (dados: string) => {
      this.service.listPorMesReferencia(this.idControle, dados)
      .subscribe((obs: any) => {
        this.observacao = obs;
        this.preencheCampos();
        this.msgErro = '';
      }, (erro: any) => {
        this.msgErro = 'Não encontrado dados para esse mês informado!';
        this.formulario.get('observacao').setValue('');
      });
    });

  }

  atualizaLista() {
    // Recebe uma lista de observações de forma assíncrona
    this.service.listPorControle(this.idControle).subscribe(
      (dados: any) => {
        if (dados.total > 0) {
          this.observacoes = dados.data;
          this.buscaEmpresa(this.observacoes[0].controles.empresa_id);
          this.totalRegistros = dados.total;
          this.msgDados = '';
        } else {
          if (!this.empresa) {
            this.serviceControle.listaControle(this.idControle)
              .subscribe( (conts: any) => {
                this.empresa = conts.empresa;
              });
          }
          this.msgDados = 'Não encontrado observações!';
        }
      }, error => {
        this.alertService.showAlertDanger('Erro ao carregar lista!');
        setTimeout(() => {
          this.onBack();
        }, 2000);
      }
    );
  }

  gravarObservacao() {
    if (this.formulario.get('mes_referencia').value == null) {
      this.alertService.showAlertDanger('Selecione um mês para referência!');
      return;
    } else if (this.formulario.get('estado').value == null) {
      this.alertService.showAlertDanger('Selecione o estado da observação!');
      return;
    } else if (this.formulario.get('observacao').value == null) {
      this.alertService.showAlertDanger('Você deve informar uma observação!');
      return;
    }
    // Retira espaços do início e final da observação
    this.formulario.get('observacao').setValue(this.formulario.get('observacao').value.trim());
    const tam = this.formulario.get('observacao').value.length;

    if (tam < 15) {
      this.alertService.showAlertDanger('A observação deve conter no mínimo 15 caracteres!');
      return;
    } else if (tam > 255) {
      this.alertService.showAlertDanger('A observação deve conter no máximo 255 caracteres!');
      return;
    }

    this.service.gravaObservação(this.idControle, this.formulario.value)
      .subscribe(dados => {
        if (dados) {
          this.alertService.showAlertSucess('Dados incluídos com sucesso!');
          setTimeout(() => {
            this.alertService.closeAlert();
            this.onBack();
          }, 1500);
        }
      }, (error: any) => {
        console.log('eRRo no servidor' , error);
      });
  }

  preencheCampos() {
    this.formulario.get('observacao').setValue(this.observacao.observacao);
    this.formulario.get('estado').setValue(this.observacao.estado);
  }

  buscaEmpresa(id: number = null) {
    if (id == null) {
      return;
    }
    this.serviceEmpresa.listPorId(id)
    .subscribe( (dados: any) => {
      this.empresa = dados;
    });
  }

  onBack() {
    this.router.navigate(['../../../controles/' + this.empresa.id_empresa], { relativeTo: this.route });
  }
}
