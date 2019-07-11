import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserProfile} from '../../models/user-profile.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';

@Injectable()
export class UserService {


  constructor(private afa: AngularFireAuth, private db: AngularFirestore) {
  }

  /*User*/
  getUser$(uid) {
    return this.db.collection('users').doc(uid).valueChanges();
  }

  getUsers$() {
    const usersRef = this.db.collection('users');

    return usersRef.get();
  }

  updateUser(user: UserProfile) {
    return this.db.collection('users').doc(user.uid).set(this.convertToTypelessObject(user));
  }

  addUser(user: UserProfile) {
    return this.updateUser(user); // Add and Update are the same operation in firestore
  }

  /*User Profile*/
  getUserProfile$() {
    if (this.afa.auth.currentUser) {
      return this.db.collection('users').doc(this.afa.auth.currentUser.uid).valueChanges();
    } else {
      return of(null);
    }
  }

  getUserMemberships$() {
    if (this.afa.auth.currentUser) {
      return this.db.collection('users').doc(this.afa.auth.currentUser.uid).collection('memberships').get();
    } else {
      return of(null);
    }
  }

  storeUserProfile(userProfile: any) {
    localStorage.setItem('currentUser', JSON.stringify(userProfile));
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem('currentUser')) as UserProfile;
  }

  private convertToTypelessObject(user: UserProfile) {
    return JSON.parse(JSON.stringify(user));
  }
}
