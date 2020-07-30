import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosEnergeticosComponent } from './gastos-energeticos.component';
import { GastosEnergeticosRoutingModule } from './gastos-energeticos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GastosEnergeticosRoutingModule
  ],
  declarations: [GastosEnergeticosComponent]
})
export class GastosEnergeticosModule { }
