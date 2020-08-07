import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GastosEnergeticosComponent } from './gastos-energeticos.component';
import { GastosEnergeticosRoutingModule } from './gastos-energeticos-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    GastosEnergeticosRoutingModule
  ],
  declarations: [GastosEnergeticosComponent]
})
export class GastosEnergeticosModule { }
