// Serviço p/ passar param nas modais que estao no shared

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { ModalPorcoesComponent } from '../components/modal-porcoes/modal-porcoes.component';
import { ModalCrudAlimComponent } from '../components/modal-crud-alim/modal-crud-alim.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) { }

  showModalConfirm(title: string, msg: string, okTxt?: string, cancelarTxt?: string): Subject<boolean> {
    const bsModalRef: BsModalRef = this.modalService.show(ModalConfirmComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;
    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }
    if (cancelarTxt) {
      bsModalRef.content.cancelarTxt = cancelarTxt;
    }

    return (<ModalConfirmComponent>bsModalRef.content).confirmResult;
  }

  showModalPorcoes(id: number) {
    const porcaoModalRef: BsModalRef = this.modalService.show(ModalPorcoesComponent);
    porcaoModalRef.content.id = id;
  }

  showModalAlim(id?: number) {
    const porcaoModalRef: BsModalRef = this.modalService.show(ModalCrudAlimComponent);
    porcaoModalRef.content.id = id;
  }

}
