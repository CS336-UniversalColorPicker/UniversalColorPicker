import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async signUserIn(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
  
  async createAccount(email: string, password: string): Promise<any> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  async signUserOut(): Promise<void> {
    return await signOut(this.auth);
  }

  getSignedInUid(): string | undefined {
    return this.auth.currentUser?.uid;
  }
}
