import { Empresa } from './../../../model/empresa';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalService } from './../../../share/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from './../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css']
})
export class EmpresasFormComponent implements OnInit {

  idEmpresa: number;
  formulario: FormGroup;
  empresa: Empresa;
  editando = false;
  erros: [];

  constructor(
    private service: EmpresaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.idEmpresa = this.route.snapshot.params.id
      ? parseInt(this.route.snapshot.params.id, 10)
      : null;

    this.formulario = this.fb.group({
      id_empresa: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
      cnpj: [
        null,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ]
    });

    // Se for edição preenche os campos com os dados do empresa
    const url: string = this.router.url;
    if (url.indexOf('novo') === -1) {
      this.editando = true;
      // Recebe id da empresa pela URL e já transforma em número

      // Busca no serviço a empresa pelo id
      this.spinner.show();
      this.service.listPorId(this.idEmpresa).subscribe(
        (emp) => {
          this.empresa = emp;
          this.preencherCampos();
          this.spinner.hide();
        },
        () => this.router.navigate(['empresas'])
      );
    }
  }

  formataCNPJ() {
    if (this.formulario.get('cnpj').value) {
      this.formulario
        .get('cnpj')
        .setValue(
          this.formulario
            .get('cnpj')
            .value.
            replace(/\D+/g, ''));
        } else {
          return '';
        }
  }

  formataData(data) {
    const date = new Date(data);
    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();
    const hora = date.getHours();
    const minutos  = date.getMinutes();
    const segundos = date.getSeconds();

    const diaF = (dia < 10) ? '0' + dia : dia;
    const mesF = (mes < 10) ? '0' + (mes + 1) : (mes + 1);

    return diaF + '/' + mesF + '/' + ano + ' ' + hora + ':' + minutos + ':' + segundos;
  }

  //  Função de preencher os campos do formulário
  preencherCampos() {
    this.formulario.get('nome').setValue(this.empresa.nome);
    this.formulario.get('id_empresa').setValue(this.empresa.id_empresa);
    this.formulario.get('cnpj').setValue(this.empresa.cnpj);
  }

  gravarForm() {
    const empresa = this.formulario.value;
    let id: number;
    if (this.idEmpresa) {
      id = this.idEmpresa;
    }
    if (this.formulario.valid) {
      this.spinner.show();
      this.service.gravarEmpresa(empresa, id).subscribe(
        (dados) => {
          this.alertService.showAlertSucess(
            id != null
              ? 'Empresa atualizada com sucesso!'
              : 'Empresa cadastrada com sucesso!'
          );
          setTimeout(() => {
            this.alertService.closeAlert();
            setTimeout(() => {
              this.router.navigate(['empresas']);
            }, 1000);
          }, 1000);
          this.spinner.hide();
        },
        (erro: any) => {
          this.erros = erro.dados;
          this.alertService.showAlertDanger(id != null ? 'Erro ao atualizar empresa!' : 'Erro ao cadastrar empresa!');
          this.spinner.hide();
        });
    } else {
      this.alertService.showAlertDanger(
        'Verifique os campos em vermelho e preencha-os corretamente!'
      );
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      });
    }
  }

  cancelarForm() {
    this.router.navigate(['empresas']);
  }

  verificaValidadeCampo(campo) {
    return {
      'is-invalid':
        this.formulario.get(campo).dirty && this.formulario.get(campo).invalid,
      'is-valid': this.formulario.get(campo).valid,
    };
  }

  mostraErro(form) {
    const campo = this.formulario.get(form);
    if (campo.invalid && campo.dirty) {
      return true;
    }
    return false;
  }

  aplicaClasseErro(campo) {
    return {
      'alert alert-danger': true,
    };
  }

  imprimeErro(field, opcoes = null) {
    const campo = this.formulario.get(field);
    if (campo.errors == null) {
      return;
    }
    const tipoErro = campo.errors;
    if (tipoErro.required === true && campo.dirty) {
      return `${field} é obrigatório.`;
    } else if (tipoErro.minlength) {
      return `${field} deve ter no mínimo ${tipoErro.minlength.requiredLength} caracteres.`;
    } else if (tipoErro.maxlength) {
      return `${field} deve ter no máximo ${tipoErro.maxlength.requiredLength} caracteres.`;
    }
  }
}
