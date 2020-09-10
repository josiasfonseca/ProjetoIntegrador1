import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { EmpresaService } from './../../services/empresa.service';
import { ImportadorService } from './../../services/importador.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-importador-fornecedor',
  templateUrl: './importador-fornecedor.component.html',
  styleUrls: ['./importador-fornecedor.component.css']
})
export class ImportadorFornecedorComponent implements OnInit {

  idEmpresa: number;
  empresa: Empresa;
  msgFornecedor = '';
  msgFornecedorEscritorio = '';
  fileFornecedor: Set<File>;
  fileFornecedorEscritorio: Set<File>;

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
      this.atualizaLista();
    }
  }

  atualizaLista() {
    // Recebe uma lista de empresas de forma assíncrona
    this.spinner.show();
    this.serviceEmpresa.listPorId(this.idEmpresa)
    .subscribe( (dados: any) => {
      this.empresa = dados;
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
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

  carregaArquivoFornecedor(event) {
    this.spinner.show();
    this.msgFornecedor = 'Arquivo carregado! Clique em Enviar arquivo';
    const selectedFiles = event.srcElement.files as File;
    this.fileFornecedor = new Set();
    this.fileFornecedor.add(selectedFiles);
    this.spinner.hide();
  }

  enviarArquivoFornecedor() {
    this.spinner.show();
    this.msgFornecedor = 'Enviando arquivo. Aguarde...';
    if (this.fileFornecedor && this.fileFornecedor.size > 0) {
      this.service.enviarArquivoFornecedor(this.idEmpresa, this.fileFornecedor)
      .subscribe( (response: any) => {
        this.msgFornecedor = 'Arquivo enviado com sucesso!';
        this.spinner.hide();
      });
    }
  }

  carregaArquivoFornecedorEscritorio(event) {
    this.spinner.show();
    this.msgFornecedorEscritorio = 'Arquivo carregado! Clique em Enviar arquivo';
    const selectedFiles = event.srcElement.files as File;
    this.fileFornecedorEscritorio = new Set();
    this.fileFornecedorEscritorio.add(selectedFiles);
    this.spinner.hide();
  }

  enviarArquivoFornecedorEscritorio() {
    this.spinner.show();
    this.msgFornecedorEscritorio = 'Enviando arquivo. Aguarde...';
    if (this.fileFornecedorEscritorio && this.fileFornecedorEscritorio.size > 0) {
      this.service.enviarArquivoFornecedorEscritorio(this.idEmpresa, this.fileFornecedorEscritorio)
      .subscribe(response => {
        this.msgFornecedorEscritorio = 'Arquivo enviado com sucesso!';
        this.spinner.hide();
      });
    }
  }

  confrontarFornecedores(event) {
    this.spinner.show();
    this.service.confrontarFornecedores(this.idEmpresa)
    .subscribe((resp: any) => {
      localStorage.setItem('resultConfrontoFornecedores', JSON.stringify(resp));
      this.spinner.hide();
      this.alertService.showAlertSucess('Confronto realizado com sucesso!');
      setTimeout(() => {
        this.alertService.closeAlert();
        this.router.navigate(['/importador/importador-fornecedores/resultado-confronto/' + this.idEmpresa]);
      }, 2000);
    });
  }
}
