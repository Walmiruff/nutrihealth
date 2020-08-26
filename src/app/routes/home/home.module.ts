import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { FormCanDeactivateGuard } from '../../shared/guards/form-candesactivate.guards';


const routes: Routes = [
    { path: '', component: PatientListComponent },
    { path: 'form', component: PatientFormComponent , canDeactivate: [FormCanDeactivateGuard]},
    { path: 'form/:id', component: PatientFormComponent, canDeactivate: [FormCanDeactivateGuard] },
    { path: 'dashboard/:id', component: PatientDashboardComponent },
    { path: 'menu/:id', loadChildren: './patient-menu/patient-menu.module#PatientMenuModule' },
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
    ],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
