import { Usuario } from './../../../model/usuario';
import { UsuariosService } from './../../../services/usuarios.service';
import { CepService } from './../../../services/externo/cep.service';
import { EstadosService } from './../../../services/estados.service';
import { Estado } from './../../../model/estado';
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
  estados: Estado[];
  timer = null;
  erroCep = '';
  usuarios: Usuario[];
  campoBuscaUsuario = '';
  usuarioLogado: Usuario;

  constructor(
    private service: EmpresaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private spinner: NgxSpinnerService,
    private estadoService: EstadosService,
    private cepService: CepService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {

    // recebe os estados
    this.estados = this.estadoService.getEstados();

    this.usuarioLogado = JSON.parse(atob(localStorage.getItem('user')));

    this.idEmpresa = this.route.snapshot.params.id
    ? parseInt(this.route.snapshot.params.id, 10)
    : null;

    this.formulario = this.fb.group({
      id_empresa: [null],
      nome: [ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(45) ] ],
      razao_social: [ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(150) ] ],
      cnpj: [ null, [ Validators.required, Validators.minLength(14), Validators.maxLength(14) ] ],
      ie: [ null, [ Validators.maxLength(20) ] ],
      im: [ null, [ Validators.maxLength(20) ] ],
      tipo: [ null, [ Validators.required ] ],
      contato: [null, [Validators.maxLength(100)]],
      email: [null, [Validators.maxLength(100), Validators.email]],
      telefone: [null, [Validators.maxLength(30)]],
      whatsapp: [null, [Validators.maxLength(30)]],
      cep: [null, [Validators.maxLength(8)]],
      endereco: [null, [Validators.maxLength(150)]],
      numero: [null, [Validators.maxLength(10)]],
      complemento: [null, [Validators.maxLength(50)]],
      bairro: [null, [Validators.maxLength(50)]],
      uf: [null, [Validators.maxLength(2)]],
      codigo_municipio: [null, Validators.maxLength(8)],
      cidade: [null, [Validators.maxLength(150)]],
      usuario_id: [{ value: null, disabled: this.usuarioLogado.tipo_usuario.tipo !== 'GERENTE' ? true : false}, [Validators.required]]
    });

    this.buscaUsuario();

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

  // recebe os usuários
  buscaUsuario(e = null) {
      this.campoBuscaUsuario = e ? e.target.value :  '';
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.usuarioService.listAll(this.campoBuscaUsuario)
         .subscribe((resp: any) => {
             this.usuarios = resp;
           });
      }, 550);
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
    this.formulario.get('razao_social').setValue(this.empresa.razao_social);
    this.formulario.get('id_empresa').setValue(this.empresa.id_empresa);
    this.formulario.get('cnpj').setValue(this.empresa.cnpj);
    this.formulario.get('ie').setValue(this.empresa.ie);
    this.formulario.get('im').setValue(this.empresa.im);
    this.formulario.get('tipo').setValue(this.empresa.tipo);
    this.formulario.get('contato').setValue(this.empresa.contato);
    this.formulario.get('email').setValue(this.empresa.email);
    this.formulario.get('telefone').setValue(this.empresa.telefone);
    this.formulario.get('whatsapp').setValue(this.empresa.whatsapp);
    this.formulario.get('cep').setValue(this.empresa.cep);
    this.formulario.get('endereco').setValue(this.empresa.endereco);
    this.formulario.get('numero').setValue(this.empresa.numero);
    this.formulario.get('complemento').setValue(this.empresa.complemento);
    this.formulario.get('bairro').setValue(this.empresa.bairro);
    this.formulario.get('uf').setValue(this.empresa.uf);
    this.formulario.get('codigo_municipio').setValue(this.empresa.codigo_municipio);
    this.formulario.get('cidade').setValue(this.empresa.cidade);
    this.formulario.get('usuario_id').setValue(this.empresa.usuario.id_usuario);
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

  pesquisaCep(e) {
    clearTimeout(this.timer);
    const cep  = e.target.value.replace(/\D/g, '');
    this.formulario.get('cep').setValue(cep);
    if (cep.length === 8) {
      this.spinner.show();
      this.timer = setTimeout(() => {
        this.cepService.consultaCep(cep)
        .subscribe((resp: any) => {
          this.erroCep = '';
          this.preencheEndereco(resp);
          this.spinner.hide();
          if (resp.erro) {
            this.erroCep = 'CEP não encontrado!';
          }
        }, (error: any) => {
          this.spinner.hide();
          this.alertService.showAlertDanger('Erro ao buscar cep');
        });
      }, 500);
    }
  }

  preencheEndereco(dados) {
    this.formulario.get('endereco').setValue(dados.logradouro);
    this.formulario.get('complemento').setValue(dados.complemento);
    this.formulario.get('bairro').setValue(dados.bairro);
    this.formulario.get('uf').setValue(dados.uf);
    this.formulario.get('cidade').setValue(dados.localidade);
    this.formulario.get('codigo_municipio').setValue(dados.ibge);
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
