import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientMenuComponent } from './patient-menu.component';


const routes: Routes = [
    {
        path: '', component: PatientMenuComponent,
        children: [
            { path: 'cards', loadChildren: './components/cards/cards.module#CardsModule' },
            { path: 'gastos-energeticos', loadChildren: './gastos-energeticos/gastos-energeticos.module#GastosEnergeticosModule' },
            { path: '', redirectTo: 'cards', pathMatch: 'prefix' },
        ]

    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class PatientMenuRoutingModule { }