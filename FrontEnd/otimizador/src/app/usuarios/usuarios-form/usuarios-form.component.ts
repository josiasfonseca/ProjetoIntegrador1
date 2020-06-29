import { AlertModalService } from './../../share/alert-modal.service';
import { AlertModalComponent } from './../../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from './../../model/usuario';
import { TipoFuncionario } from './../../enums/tipoFuncionario';
import { UsuariosService } from './../usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/enums/status';
import { stringify } from 'querystring';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
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

  constructor(
    private service: UsuariosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {

    // Recebe uma lista dos tipos de usuários (Enums) no formato de Array
    this.tiposUsuarios = this.service.listTiposUsuarios();
    this.usuarioUrl = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    // Cria os controles do formulário Reativo
    // this.usuario = {id: null, nome: null, login: null, senha: null, tipo: null, ativo: null};
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, [ (this.usuarioUrl == null ? Validators.required : Validators.minLength(0) ),
        Validators.minLength(6), Validators.maxLength(25)]],
      ativo: ['Sim', [Validators.required]],
      tipo: ['', [Validators.required]]
    });

    // Se for edição preenche os campos com os dados do usuário
    const url: string = this.router.url;
    if (url.indexOf('novo') === -1) {

        this.editando = true;
        // Recebe id do usuário pela URL e já transforma em número


        // Busca no serviço o usuário pelo id
        this.service.listById(this.usuarioUrl).subscribe(usu => {

          this.usuario = usu;
          this.preencherCampos();
      },
      () => this.router.navigate(['usuarios']));
    }
  }
  //  Função de preencher os campos do formulário
  preencherCampos() {

    this.formulario.get('login').setValue(this.usuario.login);
    this.formulario.get('nome').setValue(this.usuario.nome);
    this.formulario.get('ativo').setValue(this.usuario.ativo);
    this.formulario.get('tipo').setValue(this.usuario.tipo);
    this.formulario.get('id').setValue(this.usuario.id);
  }

  gravarForm(usuario: FormGroup) {
    // console.log(this.formulario);
    let id: number;
    if (this.usuarioUrl) {
      id = this.usuarioUrl;
    }
    if (this.formulario.valid) {
        this.service.gravarUsuario(usuario, id)
      .subscribe( dados => {
        this.alertService.showAlertSucess( id != null ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
        setTimeout(() => {
          this.alertService.closeAlert();
          setTimeout(() => {
            this.router.navigate(['usuarios']);
          }, 1000);
        }, 1000);
      }, (erro: any) => {
        this.erros = (erro.error.errors as Usuario);
        if (this.erros.login[0] === 'validation.unique') {
          this.alertService.showAlertDanger('O campo login já existe! Informe outro valor válido!');
          this.formulario.get('login').setValue('');
        } else {
          this.alertService.showAlertDanger( id != null ? 'Erro ao atualizar usuário!' : 'Erro ao cadastrar usuário!');
        }
      });
    } else {
      this.alertService.showAlertDanger('Verifique os campos em vermelho e preencha-os corretamente!');
      Object.keys(this.formulario.controls).forEach(campo => {
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
      'is-invalid':  (this.formulario.get(campo).dirty && this.formulario.get(campo).invalid),
      'is-valid':  (this.formulario.get(campo).valid)
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
      'alert alert-danger' : true
    };
  }

  imprimeErro(field, opcoes = null) {
    const campo = this.formulario.get(field);
    if (campo.errors == null) {
      return;
    }
    const tipoErro = campo.errors;
    if (tipoErro.required === true && campo.dirty) {
      return `O ${field} é obrigatório.`;
    } else if (tipoErro.minlength) {
      return `O ${field} deve ter no mínimo ${tipoErro.minlength.requiredLength} caracteres.`;
    } else if (tipoErro.maxlength) {
      return `O ${field} deve ter no máximo ${tipoErro.maxlength.requiredLength} caracteres.`;
    }
  }
}
