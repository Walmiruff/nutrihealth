import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';


import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { IUser } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<IUser>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
    ) {
      // Get auth data, then get firestore user document || null
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          return this.angularFirestore.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }





  signOut() {
    this.angularFireAuth.auth.signOut().then(() => {
        this.router.navigate(['/pages/auth/login']);
    });
  }

}
