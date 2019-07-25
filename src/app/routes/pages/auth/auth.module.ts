import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToasterModule
    ],
    declarations: [
      LoginComponent,
      RecoverComponent,
      RegisterComponent,
      AuthComponent
    ],
    providers: [
        ToasterService
    ],
    exports: [
        RouterModule
    ]
})

export class AuthModule { }
