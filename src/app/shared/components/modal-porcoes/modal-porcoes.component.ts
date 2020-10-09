import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-modal-porcoes',
  templateUrl: './modal-porcoes.component.html',
  styleUrls: ['./modal-porcoes.component.scss']
})
export class ModalPorcoesComponent implements OnInit {

  @Input() public id: string;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public porcaoModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descricao: [null],
      gramas: [null],
      editavel: true,
      id: this.id,
      statusOnline: 1,
    });
  }

  onConfirm() {
    this.form.controls.id.patchValue(this.id);
    this.porcaoModalRef.hide();
  }

  onClose() {
    this.porcaoModalRef.hide();
  }

}
