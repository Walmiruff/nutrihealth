import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientMenuComponent } from './patient-menu/patient-menu.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { EditpatientDeactivateGuard } from './patient-form/guards/editpatient-desactivate.guards';

const routes: Routes = [
    { path: '', component: PatientListComponent },
    { path: 'form', component: PatientFormComponent , canDeactivate: [EditpatientDeactivateGuard]},
    { path: 'form/:id', component: PatientFormComponent, canDeactivate: [EditpatientDeactivateGuard] }, // form edit
    { path: 'dashboard/:id', component: PatientFormComponent }, // dash
    { path: 'menu/:id', component: PatientMenuComponent }, // lazyloading
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        SharedPipesModule
    ],
    declarations: [
      PatientFormComponent,
      PatientDashboardComponent,
      PatientListComponent,
      PatientMenuComponent
    ],
      providers: [
          ToasterService
      ],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
