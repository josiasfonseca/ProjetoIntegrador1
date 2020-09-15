import { take, switchMap } from 'rxjs/operators';
import { AlertModalService } from './../../../share/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsuariosService } from '../../../services/usuarios.service';
import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[];
  inscricao: Subscription;
  // bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  // @ViewChild('deleteModal', {static: false}) deleteModal;
  usuarioSelecionado: Usuario;
  totalRegistros: number;

  paginaAtual: number;
  @Input() id: string;
  @Input() maxSize: 8;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  constructor(
    private service: UsuariosService,
    private router: Router, private route: ActivatedRoute,
    public modalService: BsModalService,
    public alertService: AlertModalService,
    private spinner: NgxSpinnerService
    ) { }


  ngOnInit() {
   this.atualizaLista();
  }


  atualizaLista(paginaAtual = 1) {
      // Recebe uma lista de usuários de forma assíncrona
      this.spinner.show();
      this.service.list(paginaAtual).subscribe(
        (dados: any) => {
          this.usuarios = dados.data;
          this.totalRegistros = dados.total;
          this.paginaAtual = dados.current_page;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this.alertService.showAlertDanger('Erro ao carregar lista!');
        }
      );
    }

  // Funcão redirecionará o usuário para a tela de edição de usuário
  onEdit(id: number) {
    if (id != null ) {
      this.router.navigate(['usuarios/' + id]);
    }
  }

  onDelete(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ =
    this.alertService.showConfirm('Exclusão', 'Deseja excluir esse usuário ?', null, null, `${usuario.id_usuario} - ${usuario.nome} `);
    result$.asObservable()
    .pipe(
      take(1),
      switchMap( result => result ? this.service.deleteUsuario(usuario.id_usuario) : EMPTY))
      .subscribe(dados => {
        this.alertService.showAlertSucess('Usuário excluído com sucesso!');
        setTimeout(() => {
          this.alertService.closeAlert();
          this.atualizaLista(this.paginaAtual);
        }, 1000);
      }, error => {
        this.alertService.showAlertDanger('Erro na exclusão do usuário!');
      });
  }

  // onConfirmDelete() {
  //    if (this.usuarioSelecionado.id != null) {
  //     this.service.deleteUsuario(this.usuarioSelecionado.id).subscribe( dados => {
  //       this.alertService.showAlertSucess('Usuário excluído com sucesso!');
  //       setTimeout(() => {
  //         this.alertService.closeAlert();
  //         this.atualizaLista();
  //       }, 1500);
  //     }, error => {
  //       this.alertService.showAlertDanger('Erro na exclusão do usuário!');
  //     });
  //   }
  // }

  onNew() {
    this.router.navigate(['usuarios/novo']);
  }

  previous(paginaAtual: number) {
    this.atualizaLista(paginaAtual - 1);
  }

  next(paginaAtual: number) {
    this.atualizaLista(paginaAtual + 1);
  }

  setarPagina(pagina) {
  this.atualizaLista(pagina);
  }

}
