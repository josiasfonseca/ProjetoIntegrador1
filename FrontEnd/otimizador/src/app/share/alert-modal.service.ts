import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  bsModalRef: BsModalRef;

  constructor(public modalService: BsModalService) { }

  private showAlert(mensagem: string, tipo: string ){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = tipo;
    this.bsModalRef.content.message = mensagem;
  }
  showAlertDanger(mensagem: string) {
    this.showAlert( mensagem, 'danger');
  }
  showAlertSucess(mensagem: string) {
    this.showAlert( mensagem, 'success');
  }
  closeAlert(){
    this.bsModalRef.hide();
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string, dados?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.mensagem = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    if (dados) {
      bsModalRef.content.dados = dados;
    }
    return (bsModalRef.content as ConfirmModalComponent).confirmResult;
  }
}
