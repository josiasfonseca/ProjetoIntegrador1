import { NgxSpinnerService } from 'ngx-spinner';
import { ImportadorService } from './../../../services/importador.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../../share/alert-modal.service';
import { EmpresaService } from './../../../services/empresa.service';
import { Empresa } from './../../../model/empresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-importador-cliente',
  templateUrl: './importador-cliente.component.html',
  styleUrls: ['./importador-cliente.component.css']
})
export class ImportadorClienteComponent implements OnInit {

  totalRegistros = 0;
  idEmpresa: number;
  empresa: Empresa;
  msgCliente = '';
  msgEscritorio = '';
  fileCliente: Set<File>;
  fileEscritorio: Set<File>;

  constructor(
    private service: ImportadorService,
    private serviceEmpresa: EmpresaService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.idEmpresa = this.route.snapshot.params.id ? parseInt(this.route.snapshot.params.id, 10) : null;
    if (this.idEmpresa == null) {
      this.onBack();
    } else {
      // this.buscaEmpresa(this.idEmpresa);
      this.atualizaLista();
    }

  }

  atualizaLista() {
    this.serviceEmpresa.listPorId(this.idEmpresa)
    .subscribe( (dados: any) => {
      this.empresa = dados;
    }, (error: any) => {
      this.onBack();
    });
  }

  onBack() {
    if (this.empresa == null) {
      this.router.navigate([`../../`]);
    } else {
      this.router.navigate([`../../${this.idEmpresa}`], { relativeTo: this.route });
    }
  }

  carregaArquivoCliente(event) {
    this.msgCliente = 'Arquivo carregado! Clique em Enviar arquivo';
    const selectedFiles = event.srcElement.files as File;
    this.fileCliente = new Set();
    this.fileCliente.add(selectedFiles);
    // this.service.enviarArquivoCliente(this.idEmpresa, event.target.files);
  }

  enviarArquivoCliente() {
    this.spinner.show();
    this.msgCliente = 'Enviando arquivo. Aguarde...';
    if (this.fileCliente && this.fileCliente.size > 0) {
      this.service.enviarArquivoCliente(this.idEmpresa, this.fileCliente)
      .subscribe( (response: any) => {
        console.log(response);
        this.msgCliente = 'Arquivo enviado com sucesso!';
        this.spinner.hide();
      });
    }
  }

  carregaArquivoEscritorio(event) {
    this.msgEscritorio = 'Arquivo carregado! Clique em Enviar arquivo';
    const selectedFiles = event.srcElement.files as File;
    this.fileEscritorio = new Set();
    this.fileEscritorio.add(selectedFiles);
  }

  enviarArquivoEscritorio() {
    this.spinner.show();
    this.msgCliente = 'Enviando arquivo. Aguarde...';
    if (this.fileEscritorio && this.fileEscritorio.size > 0) {
      this.service.enviarArquivoClienteEscritorio(this.idEmpresa, this.fileEscritorio)
      .subscribe(response => {
        this.msgEscritorio = 'Arquivo enviado com sucesso!';
        this.spinner.hide();
      });
    }
  }

  confrontarClientes(e) {
    this.spinner.show();
    this.service.confrontarClientes(this.idEmpresa)
    .subscribe((resp: any) => {
      localStorage.setItem('resultConfrontoClientes', JSON.stringify(resp));
      this.spinner.hide();
      this.alertService.showAlertSucess('Confronto realizado com sucesso!');
      setTimeout(() => {
        this.alertService.closeAlert();
        this.router.navigate(['/importador/importador-clientes/resultado-confronto/' + this.idEmpresa]);
      }, 2000);
    });
  }
}
