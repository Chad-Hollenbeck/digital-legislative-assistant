import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import * as app from 'firebase/app';
import { Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {


  constructor(private afa: AngularFireAuth, private db: AngularFirestore) {
  }

  /*Roles List*/
  getRoles(): Array<any> {
    return [
      { roleId: 'ADMIN', roleName: 'Administrator' },
      { roleId: 'USER', roleName: 'User' }
    ];
  }

  /*Login*/
  login(email, pass) {
    return this.afa.auth.signInWithEmailAndPassword(email, pass);
  }

  /*Logout*/
  logout() {
    localStorage.clear();
    return this.afa.auth.signOut();
  }

  /*User Account*/
  getUserAccount$() {
    return this.afa.authState;
  }

  getUserUID() {
    return this.afa.auth.currentUser.uid;
  }

  /* Force the user to re-authorize after the window/tab is closed */
  setPersistence() {
    return this.afa.auth.setPersistence('session');
  }

  isValidUserEmail(email: string) {
    return this.db.collection('users').ref.where('email', '==', email).get();
  }

  /*Reset Password*/
  resetPassword(email) {
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  /*Registration*/
  signInWithEmailLink(email: string, url: string) {
    return this.afa.auth.signInWithEmailLink(email, url);
  }

  registerUser(email, pass) {
    const tempFirebase = app.initializeApp(environment.firebase, 'temp' + Date.now());
    return new Observable((observer) => {
      tempFirebase.auth().createUserWithEmailAndPassword(email, pass).then(
        (cred: UserCredential) => {
          cred.user.sendEmailVerification().then(
            () => {
              tempFirebase.delete();
              observer.next(cred);
            },
            () => {
              observer.error();
            }
          );
        }
      );
    });
  }

  updateProfileDisplayName(user: User, username: string, photoUrl: string) {
    if (user) {
      return user.updateProfile({ displayName: username, photoURL: photoUrl });
    } else {
      return this.afa.auth.currentUser.updateProfile({ displayName: username, photoURL: photoUrl });
    }
  }

  createTempPassword() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;

  }

  /*Auth Actions*/
  verifyPasswordReset(code: string) {
    return this.afa.auth.verifyPasswordResetCode(code);
  }

  commitPasswordRest(code: string, newPass: string) {
    return this.afa.auth.confirmPasswordReset(code, newPass);
  }

  verifyEmailConfirmation(code: string) {
    return this.afa.auth.applyActionCode(code);
  }

  verifyEmailRecovery(code: string) {
    return this.afa.auth.checkActionCode(code);
  }

  commitEmailRecovery(code: string) {
    return this.afa.auth.applyActionCode(code);
  }


}
