import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanosAlimentaresComponent } from './planos-alimentares.component';

const routes: Routes = [
  {
      path: '',
      component: PlanosAlimentaresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanosAlimentaresRoutingModule { }
