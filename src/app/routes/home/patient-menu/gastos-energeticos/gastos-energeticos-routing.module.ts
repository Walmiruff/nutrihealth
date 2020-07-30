import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosEnergeticosComponent } from './gastos-energeticos.component';

const routes: Routes = [
  {
      path: '',
      component: GastosEnergeticosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GastosEnergeticosRoutingModule { }
