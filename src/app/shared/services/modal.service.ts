// Serviço p/ passar param nas modais que estao no shared

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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


}
