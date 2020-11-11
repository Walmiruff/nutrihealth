import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientMenuComponent } from './patient-menu.component';


const routes: Routes = [
    {
        path: '', component: PatientMenuComponent,
        children: [
            { path: 'cards', loadChildren: './components/cards/cards.module#CardsModule' },
            { path: 'gastos-energeticos', loadChildren: './gastos-energeticos/gastos-energeticos.module#GastosEnergeticosModule' },
            { path: 'planos-alimentares', loadChildren: './planos-alimentares/planos-alimentares.module#PlanosAlimentaresModule' },
            { path: 'aval-laboratoriais', loadChildren: './aval-laboratoriais/aval-laboratoriais.module#AvalLaboratoriaisModule' },
            { path: 'gastos-energeticos/:id', loadChildren: './gastos-energeticos/gastos-energeticos.module#GastosEnergeticosModule'},
            { path: 'planos-alimentares/:id', loadChildren: './planos-alimentares/planos-alimentares.module#PlanosAlimentaresModule' },
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
