import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanosAlimentaresComponent } from './planos-alimentares.component';
import { PlanosAlimentaresRoutingModule } from './planos-alimentares-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedPipesModule } from '../../../../shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [PlanosAlimentaresComponent],
  imports: [
    CommonModule,
    PlanosAlimentaresRoutingModule,
    SharedModule,
    SharedPipesModule,
  ]
})
export class PlanosAlimentaresModule { }
