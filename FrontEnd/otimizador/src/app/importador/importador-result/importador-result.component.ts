import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { EmpresaService } from './../../services/empresa.service';
import { ImportadorService } from './../../services/importador.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-importador-result',
  templateUrl: './importador-result.component.html',
  styleUrls: ['./importador-result.component.css']
})
export class ImportadorResultComponent implements OnInit {

  idEmpresa: number;
  empresa: Empresa;
  empresas: any[];

  constructor(
    private service: ImportadorService,
    private serviceEmpresa: EmpresaService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.serviceEmpresa.listPorId(this.idEmpresa)
    .subscribe( (dados: any) => {
      this.empresa = dados;
    }, (error: any) => {
      this.onBack();
    });
    this.empresas = JSON.parse(localStorage.getItem('resultConfrontoFornecedores'));
    // localStorage.removeItem('resultConfrontoFornecedores');
    console.log(this.empresas);
  }

  onBack() {
    if (this.empresa == null) {
      this.router.navigate([`../../../`]);
    } else {
      this.router.navigate([`../../../${this.idEmpresa}`], { relativeTo: this.route });
    }
  }

  baixarFornecedoresComErroExcel() {
    this.service.baixarFornecedoresComErro(this.idEmpresa, 'xls')
    .subscribe((res: any) => {
      this.service.handleFile(res, `fornecedores-com-erro-${this.idEmpresa}.xls`);
    }, (err: any) => {
      console.log('erro ao baixar arquivo', err);
    });
  }

  baixarFornecedoresComErroPDF() {
    this.service.baixarFornecedoresComErro(this.idEmpresa, 'pdf')
    .subscribe((res: any) => {
      this.service.handleFile(res, `fornecedores-com-erro-${this.idEmpresa}.pdf`);
    }, (err: any) => {
      console.log('erro ao baixar arquivo', err);
    });
  }
}
