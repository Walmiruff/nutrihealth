import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosEnergeticosComponent } from './gastos-energeticos.component';
import { FormCanDeactivateGuard  } from '../../../../shared/guards/form-candesactivate.guards';

const routes: Routes = [
  {
      path: '',
      component: GastosEnergeticosComponent,
      canDeactivate: [FormCanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GastosEnergeticosRoutingModule { }
