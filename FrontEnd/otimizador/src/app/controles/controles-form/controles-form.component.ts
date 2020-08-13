import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Controle } from 'src/app/model/controle';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-controles-form',
  templateUrl: './controles-form.component.html',
  styleUrls: ['./controles-form.component.css']
})
export class ControlesFormComponent implements OnInit {

  controle: Controle;
  idControle: number;
  formulario: FormGroup;
  editando = false;
  idEmpresa: number;
  empresa: Empresa;

  constructor(
    private service: ControleService,
    private serviceEmpresa: EmpresaService,
    private fb: FormBuilder,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idControle = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    const url: string = this.router.url;

    if (url.indexOf('novo') === -1) {
      if (this.idControle) {
        this.editando = true;
        this.buscaDados();
      }
    } else {
      this.idEmpresa = this.idControle;
      this.buscaEmpresa(this.idEmpresa);
    }

    this.formulario = this.fb.group({
      empresa_id: [this.idEmpresa, Validators.required],
      ano: [null, Validators.required],
      jan: [null],
      fev: [null],
      mar: [null],
      abr: [null],
      mai: [null],
      jun: [null],
      jul: [null],
      ago: [null],
      set: [null],
      out: [null],
      nov: [null],
      dez: [null],
    });
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

  buscaDados() {
    this.service.listaControle(this.idControle).subscribe( (dados: any) => {
      this.controle = dados;
      this.buscaEmpresa(this.controle.empresa_id);
      this.preencheCampos();
    }, error => {
      this.alertService.showAlertDanger('Erro ao carregar dados!');
      setTimeout(() => {
        this.alertService.closeAlert();
        this.onBack();
      }, 2000);
    });
  }

  preencheCampos() {
    this.formulario.get('ano').setValue(this.controle.ano);
    this.formulario.get('jan').setValue(this.controle.jan);
    this.formulario.get('fev').setValue(this.controle.fev);
    this.formulario.get('mar').setValue(this.controle.mar);
    this.formulario.get('abr').setValue(this.controle.abr);
    this.formulario.get('mai').setValue(this.controle.mai);
    this.formulario.get('jun').setValue(this.controle.jun);
    this.formulario.get('jul').setValue(this.controle.jul);
    this.formulario.get('ago').setValue(this.controle.ago);
    this.formulario.get('set').setValue(this.controle.set);
    this.formulario.get('out').setValue(this.controle.out);
    this.formulario.get('nov').setValue(this.controle.nov);
    this.formulario.get('dez').setValue(this.controle.dez);
    this.formulario.get('empresa_id').setValue(this.controle.empresa_id);
  }

  onBack() {
    if (this.controle) {
      this.router.navigate(['../../' + this.controle.empresa_id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../' + this.idControle], { relativeTo: this.route });
    }
  }

  gravar() {
    const controle = this.formulario.value;
    let id: number = null;
    if (this.editando) {
      id = this.idControle;
    }
    if (!this.formulario.get('ano').value) {
      this.alertService.showAlertDanger('O Ano deve ser obrigatório!');
      this.formulario.get('ano').markAsDirty();
      setTimeout(() => {
        this.alertService.closeAlert();
      }, 2000);
      return;
    }
    this.service.gravar(controle, id)
      .subscribe( (dados: any) => {
        if (dados) {
          this.alertService.showAlertSucess(id != null ? 'Controle atualizado com sucesso!' : 'Controle cadastrado com sucesso!');
          setTimeout(() => {
            this.alertService.closeAlert();
            setTimeout(() => {
              this.onBack();
            }, 1000);
          }, 1500);
        }
      }, (error: any) => {
        this.alertService.showAlertDanger(id != null
          ? `Erro ao atualizar controle!`
          : `Erro ao cadastrar controle!`);
      });
  }

  verificaValidadeCampo(campo) {
    console.log(this.formulario);
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


}
