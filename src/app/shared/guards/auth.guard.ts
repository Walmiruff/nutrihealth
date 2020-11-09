import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route  } from '@angular/router';
import { Observable } from 'rxjs';

import { AlimentosService } from '../services/alimentos.service';
import { IAlimento } from '../models/alimentos.model';
import { IPorcoes } from '../models/porcoes.model';
import { PortionStore } from '../store/porcoes.store';
import { AlimListStore } from '../store/alim-list.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  codigoUsuario: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private portionStore: PortionStore,
    private alimListStore: AlimListStore,
    private alimentosService: AlimentosService
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
      this.loadPortionsAndAlims();
      return true;
    }
    this.router.navigate(['/pages/auth/login']);
    localStorage.removeItem('uid');

    return false;
  }

  public loadPortionsAndAlims() {
    this.alimentosService.getPorcoes().subscribe((portions: IPorcoes[]) => this.portionStore.set(portions));
    this.alimentosService.getAlimsDB().subscribe((alimentos: IAlimento[]) => this.alimListStore.set(alimentos));
  }
}
