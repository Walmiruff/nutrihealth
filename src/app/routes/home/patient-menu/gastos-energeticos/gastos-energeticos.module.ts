import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService } from 'angular2-toaster';

import { GastosEnergeticosComponent } from './gastos-energeticos.component';
import { GastosEnergeticosRoutingModule } from './gastos-energeticos-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedPipesModule } from '../../../../shared/pipes/shared-pipes.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPipesModule,
    GastosEnergeticosRoutingModule
  ],
  providers: [
    ToasterService,
],
  declarations: [GastosEnergeticosComponent]
})
export class GastosEnergeticosModule { }
