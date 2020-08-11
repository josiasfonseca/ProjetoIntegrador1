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

  constructor(
    private service: ControleService,
    private fb: FormBuilder,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idControle = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;

    if (!this.idControle) {
      this.router.navigate(['/']);
    }

    this.buscaDados();

    this.formulario = this.fb.group({
      id_usuario: [null],
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

  buscaDados() {
    this.service.listaControle(this.idControle).subscribe( (dados: any) => {
      this.controle = dados;
      this.preencheCampos();
    }, error => {
      this.onBack();
      this.alertService.showAlertDanger('Erro ao carregar dados!');
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
  }

  onBack() {
    this.router.navigate(['../../' + this.controle.empresa_id], { relativeTo: this.route });
  }

}
