import { AlertModalService } from './../../../share/alert-modal.service';
import { EmpresaService } from './../../../services/empresa.service';
import { ImportadorService } from './../../../services/importador.service';
import { Empresa } from './../../../model/empresa';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-importador-result-cliente-erro',
  templateUrl: './importador-result-cliente-erro.component.html',
  styleUrls: ['./importador-result-cliente-erro.component.css']
})
export class ImportadorResultClienteErroComponent implements OnInit {

  idEmpresa: number;
  empresa: Empresa;
  empresas: any[];
  baixarArquivoContab = false;

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
      this.atualizaDados();
    }
  }

  atualizaDados() {
    this.spinner.show();
    this.serviceEmpresa.listPorId(this.idEmpresa)
    .subscribe( (dados: any) => {
      this.empresa = dados;
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
      this.onBack();
    });
    const result = JSON.parse(localStorage.getItem('resultConfrontoClientes'));
    this.empresas = result[1];
  }

  onBack() {
    if (this.empresa == null) {
      this.router.navigate([`../../../`]);
    } else {
      this.router.navigate([`../../../${this.idEmpresa}`], { relativeTo: this.route });
    }
  }

  baixarClientesComErroExcel() {
    this.spinner.show();
    this.service.baixarClientesComErro(this.idEmpresa, 'xls')
    .subscribe((res: any) => {
      this.service.handleFile(res, `clientes-com-erro-${this.idEmpresa}.xls`);
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    });
  }

  baixarClientesComErroPDF() {
    this.spinner.show();
    this.service.baixarClientesComErro(this.idEmpresa, 'pdf')
    .subscribe((res: any) => {
      this.service.handleFile(res, `clientes-com-erro-${this.idEmpresa}.pdf`);
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
    });
  }

  gerarArquivoContabilidade(idEmpresa: number) {
    this.spinner.show();
    this.service.gerarArquivoContabilidadeClientes(idEmpresa)
    .subscribe((res: any) => {
      this.alertService.showAlertSucess('Arquivo gerado com sucesso! Clique para fazer o download do arquivo.');
      this.baixarArquivoContab = true;
      this.spinner.hide();
    }, (error: any) => {
      this.alertService.showAlertDanger('Erro ao gerar arquivo. Tente novamente mais tarde!');
      this.spinner.hide();
    });
  }

  baixarArquivoContabilidade(idEmpresa: number) {
    this.spinner.show();
    this.service.baixarClientesContabilidade(idEmpresa, 'csv')
    .subscribe((resposta: any) => {
      this.service.handleFile(resposta, `clientesContabilidade-ok-${this.idEmpresa}.csv`);
      this.spinner.hide();
    }, (error: any) => {
      this.alertService.showAlertDanger('Erro ao gerar arquivo. Tente novamente mais tarde!');
      this.spinner.hide();
    });
  }
}
