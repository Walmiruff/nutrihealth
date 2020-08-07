import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanosAlimentaresComponent } from './planos-alimentares.component';
import { PlanosAlimentaresRoutingModule } from './planos-alimentares-routing.module';

@NgModule({
  declarations: [PlanosAlimentaresComponent],
  imports: [
    CommonModule,
    PlanosAlimentaresRoutingModule,
  ]
})
export class PlanosAlimentaresModule { }
