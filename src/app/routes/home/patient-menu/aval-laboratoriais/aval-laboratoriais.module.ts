import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvalLaboratoriaisComponent } from './aval-laboratoriais.component';
import { AvalLaboratoriaisRoutingModule } from './aval-laboratoriais-routing.module';

@NgModule({
  declarations: [AvalLaboratoriaisComponent],
  imports: [
    CommonModule,
    AvalLaboratoriaisRoutingModule,
  ]
})
export class AvalLaboratoriaisModule { }
