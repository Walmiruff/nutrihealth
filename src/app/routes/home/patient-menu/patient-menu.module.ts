import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientMenuRoutingModule } from './patient-menu-routing.module';
import { PatientMenuComponent } from './patient-menu.component';
import { HeaderComponent } from './components/header/header.component';

import { SharedModule } from '../../../shared/shared.module';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';


@NgModule({
    imports: [
        CommonModule,
        PatientMenuRoutingModule,
        SharedPipesModule,
        SharedModule,
    ],
    declarations: [PatientMenuComponent, HeaderComponent]
})
export class PatientMenuModule {}
