import { take, switchMap } from 'rxjs/operators';
import { AlertModalService } from './../../share/alert-modal.service';
import { AlertModalComponent } from './../../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsuariosService } from './../usuarios.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';

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

  constructor(
    private service: UsuariosService,
    private router: Router, private route: ActivatedRoute,
    public modalService: BsModalService,
    public alertService: AlertModalService
    ) { }


  ngOnInit() {
   this.atualizaLista();
  }


  atualizaLista() {
      // Recebe uma lista de usuários de forma assíncrona
      this.service.list().subscribe(
        (dados: any) => {
          this.usuarios = dados.data;
          this.totalRegistros = dados.total;
        }, error => {
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
    this.alertService.showConfirm('Exclusão', 'Deseja excluir esse usuário ?', null, null, `${usuario.id} - ${usuario.nome} `);
    result$.asObservable()
    .pipe(
      take(1),
      switchMap( result => result ? this.service.deleteUsuario(usuario.id) : EMPTY))
      .subscribe(dados => {
        this.alertService.showAlertSucess('Usuário excluído com sucesso!');
        setTimeout(() => {
          this.alertService.closeAlert();
          this.atualizaLista();
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

}
