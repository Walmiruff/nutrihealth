// Essa guarda de desativação de rota so implement para 1 formulario

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from '../models/form-candesactivate.model';




@Injectable({
    providedIn: 'root'
})

export class FormCanDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
    // Desativar a rota situaçoes:
    //  sair do formulario de ediçao ou fazer requisção para servidor e ocorre falha

    canDeactivate(component: IFormCanDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot): boolean | Observable<boolean> {

     //   console.log('guarda de desativação');

        return component.podeDesativar();
    }





    constructor() { }


}