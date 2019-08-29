import { Injectable, OnDestroy } from '@angular/core';
import { IAuthService } from './auth.service.interface';
import { Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { User as FirebaseUser, auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { SupportedProviders } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService, OnDestroy {
  private subscription: Subscription;

  private userSubject$: BehaviorSubject<User>;
  user$: Observable<User>


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    const localeUser = JSON.parse(localStorage.getItem('user'));
    this.userSubject$ = new BehaviorSubject<User>(localeUser);
    this.user$ = this.userSubject$.asObservable();
    this.subscription = new Subscription();

    this.setupAuthState();
  }

  setupAuthState(): void {
    this.subscription.add(
      this.afAuth.authState
        .pipe(
          switchMap((user: FirebaseUser) => user
            ? this.afs.doc<User>(`users/${user.uid}`).valueChanges()
            : of(null))
        )
        .subscribe((user: User) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject$.next(user);
          }
        }));
  }

  userValue(): User {
    return this.userSubject$.value;
  }

  // ============ OAuth Methos ============

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  async oAuthLogin(provider: auth.AuthProvider): Promise<boolean> {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      await this.updateUserData(credential.user, SupportedProviders.GOOGLE);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // ============= EMAIL ==================================================
  async emailRegister(email: string, password: string, displayName: string, readDataProtection: boolean): Promise<boolean> {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.updateUserData(credential.user, SupportedProviders.EMAIL, displayName, readDataProtection);
      await credential.user.sendEmailVerification();
      return true;
    } catch (error) {
      console.log('could not register');
      return false;
    }
  }
  async emailLogin(email: string, password: string): Promise<boolean> {
    try {
      const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.updateUserData(credential.user);
    } catch (error) {
      console.log('could not login', error);
      return false;
    }
  }
  async resetPassword(email: string): Promise<boolean> {
    try {
      const fbAuth = auth();
      await fbAuth.sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.log('could not reset password', error);
      return false;
    }
  }

  // Set User Data to Firestore

  updateUserData(user: FirebaseUser, provider?: SupportedProviders, displayName?: string, readDataProtection?: boolean) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = new User(user.uid, user.email, user.photoURL, null, null, provider, null, null);

    if (displayName) data.displayName = displayName;
    if (readDataProtection) data.readDataProtection = readDataProtection;

    return userRef.set(data, { merge: true });
  }


  // ============= Delete user account and delete user document ===========
  async deleteAccount(email: string): Promise<boolean> {
    try {
      await this.afAuth.auth.currentUser.delete();
      this.signOut();
    } catch (error) {
      console.log('could not sign out', error);
      return false;
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    await this.afAuth.auth.signOut();
    this.userSubject$.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['register']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
