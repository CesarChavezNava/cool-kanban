import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afa: AngularFireAuth) {}

  signUp(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.afa.createUserWithEmailAndPassword(email, password)).pipe(
      catchError((error) => throwError(error))
    );
  }

  signIn(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.afa.signInWithEmailAndPassword(email, password)).pipe(
      catchError((error) => throwError(error))
    );
  }

  async signInWithGoogle(): Promise<auth.UserCredential> {
    return await this.afa.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async signInWithFacebook(): Promise<auth.UserCredential> {
    return await this.afa.signInWithPopup(new auth.FacebookAuthProvider());
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(this.afa.sendPasswordResetEmail(email)).pipe(
      catchError((error) => throwError(error))
    );
  }

  async signOut(): Promise<void> {
    await this.afa.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.afa.authState.pipe(map((user) => user !== null));
  }

  getToken(): Observable<string> {
    return this.afa.idToken.pipe(
      map((token: string) => `Bearer ${token}`),
      catchError((error) => throwError(error))
    );
  }
}
