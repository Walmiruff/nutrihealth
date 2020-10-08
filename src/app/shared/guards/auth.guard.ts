import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route  } from '@angular/router';
import { Observable } from 'rxjs';

import { AlimentosService } from '../services/alimentos.service';
import { IPorcoes } from '../models/alimentos.model';
import { PortionStore } from '../store/porcoes.store';
import { MessageStore } from '../store/message.store';
import { messages } from '../const/messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  codigoUsuario: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private portionStore: PortionStore,
    private alimentosService: AlimentosService,
    private messageStore: MessageStore,
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  canLoad( route: Route ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  verificarAcesso() {
    this.afAuth.authState.subscribe(user => {
      this.codigoUsuario = user.uid;
    });
    
    if (this.codigoUsuario) {
      localStorage.setItem('uid', this.codigoUsuario);
      this.loadPortions();
      return true;
    }
    this.router.navigate(['/pages/auth/login']);
    localStorage.removeItem('uid');

    return false;
  }

  public loadPortions() {
    this.alimentosService.getPorcao().subscribe(
      (portions: IPorcoes[]) => this.portionStore.set(portions),
      (err) => this.messageStore.set(messages[8]),
    );
  }
}
