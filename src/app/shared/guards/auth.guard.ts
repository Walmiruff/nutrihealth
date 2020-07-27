import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route  } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  codigoUsuario: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.codigoUsuario = user.uid;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  canLoad( route: Route ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  verificarAcesso() {
    if (this.codigoUsuario) {
      localStorage.setItem('uid', this.codigoUsuario);
      return true;
    }
    this.router.navigate(['/pages/auth/login']);
    localStorage.removeItem('uid');

    return false;
  }
}
