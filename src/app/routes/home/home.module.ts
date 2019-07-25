import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientMenuComponent } from './patient-menu/patient-menu.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: PatientListComponent },
    { path: 'form', component: PatientFormComponent },
    { path: 'form/:id', component: PatientFormComponent }, // form edit
    { path: 'dashboard/:id', component: PatientFormComponent }, // dash
    { path: 'menu/:id', component: PatientMenuComponent }, // lazyloading
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [
      PatientFormComponent,
      PatientDashboardComponent,
      PatientListComponent,
      PatientMenuComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
