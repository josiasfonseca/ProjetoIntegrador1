import { AlertModalService } from './../../share/alert-modal.service';
import { AlertModalComponent } from './../../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from './../../model/usuario';
import { TipoFuncionario } from './../../enums/tipoFuncionario';
import { UsuariosService } from './../usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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

    // Cria os controles do formulário Reativo
    // this.usuario = {id: null, nome: null, login: null, senha: null, tipo: null, ativo: null};
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      ativo: ['Sim', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
    console.log(this.formulario);
    // Se for edição preenche os campos com os dados do usuário
    const url: string = this.router.url;
    if (url.indexOf('novo') === -1) {

        this.editando = true;
        // Recebe id do usuário pela URL e já transforma em número
        this.usuarioUrl = parseInt(this.route.snapshot.params.id, 10);

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
    console.log(this.formulario);
    let id: number;
    if (this.usuarioUrl) {
      id = this.usuarioUrl;
    }
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
      this.alertService.showAlertDanger( id != null ? 'Erro ao atualizar usuário!' : 'Erro ao cadastrar usuário!');
    });
  }

  cancelarForm() {
    this.router.navigate(['usuarios']);
  }
}
