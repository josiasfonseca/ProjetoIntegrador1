import { AlertModalService } from './../../../share/alert-modal.service';
import { EmpresaService } from './../../../services/empresa.service';
import { ImportadorService } from './../../../services/importador.service';
import { Empresa } from './../../../model/empresa';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-importador-cartao',
  templateUrl: './importador-cartao.component.html',
  styleUrls: ['./importador-cartao.component.css']
})
export class ImportadorCartaoComponent implements OnInit {

  totalRegistros = 0;
  idEmpresa: number;
  empresa: Empresa;
  msgCartao = '';
  msgEscritorio = '';
  fileCartao: Set<File>;
  fileEscritorio: Set<File>;
  baixarArquivoCartao = false;

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
    // Recebe uma lista de controles de forma assíncrona
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

  carregaArquivoCartao(event) {
    this.msgCartao = 'Arquivo carregado! Clique em Enviar arquivo';
    const selectedFiles = event.srcElement.files as File;
    this.fileCartao = new Set();
    this.fileCartao.add(selectedFiles);
  }

  enviarArquivoCartao() {
    this.spinner.show();
    this.msgCartao = 'Enviando arquivo. Aguarde...';
    if (this.fileCartao && this.fileCartao.size > 0) {
      this.service.enviarArquivoCartao(this.idEmpresa, this.fileCartao)
      .subscribe( (response: any) => {
        console.log(response);
        this.msgCartao = 'Arquivo enviado com sucesso!';
        this.spinner.hide();
      });
    }
  }

  gerarArquivoContabilidade(idEmpresa: number) {
    this.spinner.show();
    this.service.gerarArquivoCartaoContabilidade(idEmpresa)
    .subscribe((res: any) => {
      this.alertService.showAlertSucess('Arquivo gerado com sucesso! Clique para fazer o download do arquivo.');
      this.baixarArquivoCartao = true;
      this.spinner.hide();
    }, (error: any) => {
      this.alertService.showAlertDanger('Erro ao gerar arquivo. Tente novamente mais tarde!');
      this.spinner.hide();
    });
  }

  baixarArquivoContabilidade(idEmpresa: number) {
    this.spinner.show();
    this.service.baixarCartoesContabilidade(idEmpresa, 'csv')
    .subscribe((resposta: any) => {
      this.service.handleFile(resposta, `cartoesContabilidade-${this.idEmpresa}.csv`);
      this.spinner.hide();
    }, (error: any) => {
      this.alertService.showAlertDanger('Erro ao gerar arquivo. Tente novamente mais tarde!');
      this.spinner.hide();
    });
  }
}
