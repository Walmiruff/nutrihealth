import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvalLaboratoriaisComponent } from './aval-laboratoriais.component';

const routes: Routes = [
  {
      path: '',
      component: AvalLaboratoriaisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AvalLaboratoriaisRoutingModule { }
