import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [HomeComponent, LandingComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
      RouterModule
  ]
})
export class LandingModule { }
