import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { IUser } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string;
  plan: string;
  membership: any;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
    this.membership = this.angularFireAuth.authState
    .pipe(
      tap(user => this.userId = user.uid),
      switchMap(user => {
        return (this.db.object(`users/${user.uid}/pro-membership`)).valueChanges();
      })
    );
  }


  createUser(userEmail: string, userPassword: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword).then( resp => {
      this.angularFirestore.collection('users').doc(resp.user.uid).set({
        uid: resp.user.uid,
        email: userEmail,
        roles: 'nutricionista'
      });
    });
  }


  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/pages/auth/login']);
    });
  }


  signIn(user: IUser) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  resetPassword(userEmail: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(userEmail);
  }


  processPayment(token: any, uid: string, lang: string) {
    this.userId = uid;

    if (lang === 'pt-BR') {
      this.plan = 'plan_ElEIT8gvghJpco';
    } else if (lang === 'pt' || lang === 'de' || lang === 'es' || lang === 'fr' || lang === 'it') {
      this.plan = 'plan_ElEFhTGFjeMS8w';
    } else {
      this.plan = 'plan_EhDnLlNFnLEr1F';
    }
    return this.db.object(`/users/${this.userId}/pro-membership`).update({ token: token.id, plan: this.plan });
  }

}


