import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../share/alert-modal.service';
import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-importador-list',
  templateUrl: './importador-list.component.html',
  styleUrls: ['./importador-list.component.css']
})
export class ImportadorListComponent implements OnInit {

  totalRegistros = 0;
  idEmpresa: number;
  empresa: Empresa;


  constructor(
    private serviceEmpresa: EmpresaService,
    public alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  clientes() {
    this.router.navigate([`/importador/importador-clientes/${this.idEmpresa}`]);
  }

  fornecedores() {
    this.router.navigate([`/importador/importador-fornecedores/${this.idEmpresa}`]);
  }
}
