import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientMenuComponent } from './patient-menu.component';
import { SharedModule } from '../../../shared/shared.module';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
    { path: '', component: PatientMenuComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        SharedPipesModule
    ],
    declarations: [
        PatientMenuComponent,
        HeaderComponent,
        CardsComponent
    ],
    exports: [
        RouterModule
    ]
})
export class PatientMenuModule { }
