import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gastos-energeticos',
  templateUrl: './gastos-energeticos.component.html',
  styleUrls: ['./gastos-energeticos.component.scss']
})
export class GastosEnergeticosComponent implements OnInit {

  public formularioPrincipal: FormGroup;
  public dateFormat = Date.now();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm(): void {
    this.formularioPrincipal = this.formBuilder.group({
      id: [null],
      desc: [null, [Validators.required, Validators.max(200)]],
      dataAtend: [null, Validators.required],
      idade: [null, Validators.required],
      altura: [null, Validators.required],
      peso: [null, Validators.required],
    })
  }

}
