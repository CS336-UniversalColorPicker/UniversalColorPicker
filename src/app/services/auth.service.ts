import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async signUserIn(email: string, password: string): Promise<UserCredential> {
    let credentials = await signInWithEmailAndPassword(this.auth, email, password);
    localStorage.setItem('userId', credentials.user.uid);
    return credentials;
  }
  
  async createAccount(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  async signUserOut(): Promise<void> {
    localStorage.setItem('userId', '');
    return signOut(this.auth);
  }

  getUserId(): string | null {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }
    return null;

    // return localStorage.getItem('userId');
  }

  getCurrentUser(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }
}
