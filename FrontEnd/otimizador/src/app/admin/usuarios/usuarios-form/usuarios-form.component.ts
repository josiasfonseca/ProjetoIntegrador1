import { TipoUsuarioService } from './../../../services/tipo-usuario.service';
import { AlertModalService } from './../../../share/alert-modal.service';
import { AlertModalComponent } from './../../../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from './../../../model/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
})
export class UsuariosFormComponent implements OnInit {
  private isEditable = false;
  formulario: FormGroup;
  usuario: Usuario;
  tiposUsuarios;
  usuarioUrl: number;
  editando = false;
  erros: Usuario;
  classeErro = {};
  usuarioLogado: Usuario;

  constructor(
    private service: UsuariosService,
    private serviceTipoUsuario: TipoUsuarioService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // Recebe uma lista dos tipos de usuários
    this.serviceTipoUsuario.list().subscribe((dados: any) => {
      this.tiposUsuarios = dados.data;
    });
    this.usuarioLogado = JSON.parse(atob(localStorage.getItem('user')));

    this.usuarioUrl = this.route.snapshot.params.id
      ? parseInt(this.route.snapshot.params.id, 10)
      : null;
    // Cria os controles do formulário Reativo
    // this.usuario = {id: null, nome: null, login: null, senha: null, tipo: null, ativo: null};
    this.formulario = this.fb.group({
      id_usuario: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      login: [
        {value: null, disabled: (this.usuarioLogado.tipo_usuario.tipo !== 'GERENTE' && this.usuarioUrl != null) ? true : false},
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      senha: [
        {value: null, disabled: (this.usuarioUrl != null && this.usuarioLogado.tipo_usuario.tipo !== 'GERENTE') ? true : false},
        [
          this.usuarioUrl == null
            ? Validators.required
            : Validators.minLength(0),
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
      tipo_usuario_id: [{value: '',
      disabled: (this.usuarioLogado.tipo_usuario.tipo !== 'GERENTE' && this.usuarioUrl != null) ? true : false }, [Validators.required]],
    });

    // Se for edição preenche os campos com os dados do usuário
    const url: string = this.router.url;
    if (url.indexOf('novo') === -1) {
      this.editando = true;
      // Recebe id do usuário pela URL e já transforma em número

      // Busca no serviço o usuário pelo id
      this.spinner.show();
      this.service.listById(this.usuarioUrl).subscribe(
        (usu) => {
          this.usuario = usu;
          this.preencherCampos();
          this.spinner.hide();
        },
        () => this.router.navigate(['usuarios'])
      );
    }
  }
  //  Função de preencher os campos do formulário
  preencherCampos() {
    this.formulario.get('login').setValue(this.usuario.login);
    this.formulario.get('nome').setValue(this.usuario.nome);
    this.formulario
      .get('tipo_usuario_id')
      .setValue(this.usuario.tipo_usuario.id_tipo_usuario);
    this.formulario.get('id_usuario').setValue(this.usuario.id_usuario);
  }

  formataLogin() {
    if (this.formulario.get('login').value) {
    return this.formulario
      .get('login')
      .setValue(
        this.formulario
          .get('login')
          .value.normalize('NFD').
          replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''));
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

  gravarForm() {
    this.formataLogin();
    const usuario = this.formulario.value;
    let id: number;
    if (this.usuarioUrl) {
      id = this.usuarioUrl;
    }
    if (this.formulario.valid) {
      this.spinner.show();
      this.service.gravarUsuario(usuario, id).subscribe(
        (dados) => {
          this.alertService.showAlertSucess(
            id != null
              ? 'Usuário atualizado com sucesso!'
              : 'Usuário cadastrado com sucesso!'
          );
          setTimeout(() => {
            this.alertService.closeAlert();
            setTimeout(() => {
              this.router.navigate(['usuarios']);
            }, 1000);
          }, 1000);
          this.spinner.hide();
        },
        (erro: any) => {
          this.erros = erro.error.errors as Usuario;
          if (this.erros.login[0] === 'validation.unique') {
            this.alertService.showAlertDanger(
              'O campo login já existe! Informe outro valor válido!'
              );
            this.formulario.get('login').setValue('');
            } else {
              this.alertService.showAlertDanger(
                id != null
                ? 'Erro ao atualizar usuário!'
                : 'Erro ao cadastrar usuário!'
                );
              }
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
    this.router.navigate(['usuarios']);
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
