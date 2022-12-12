import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Color } from '../interfaces/color';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private colors$ = new BehaviorSubject<Color[]>([]);
  private colors: Color[] = [];

  constructor(
    private firestore: Firestore,
    private authService: AuthService) {
  }

  async load(userId: string | null | undefined) {
    if (userId) {
      // if there's a user ID, that means we can try to pull from Firestore
      const colorCollection = collection(this.firestore, 'colors');
      const queriedData = query(colorCollection, where("userId", "==", userId));
      this.colors$ = collectionData(queriedData) as BehaviorSubject<Color[]>;
    } else {
      // there's no user ID; pull from local storage
      const locallyStoredColors = localStorage.getItem('colors');
      if (locallyStoredColors !== null) {
        // if there are locally stored colors, then load those
        this.colors = JSON.parse(locallyStoredColors);
      }
      this.colors$ = new BehaviorSubject<Color[]>(this.colors);
    }
  }

  getColors(): BehaviorSubject<Color[]> {
    return this.colors$;
  }

  async removeColor(colorId: string): Promise<void> {
    const currentUser = this.authService.getSignedInUid();
    if (currentUser) {
      // we're logged in; delete from firestore
      await deleteDoc(doc(this.firestore, 'colors', colorId));
    } else {
      // not logged in; delete locally
      const index = this.colors.findIndex((color: Color) => color.id === colorId);
      this.colors.splice(index, 1);
      localStorage.setItem('colors', JSON.stringify(this.colors));
    }
  }

  async addColor(value: string, name: string, description?: string): Promise<string> {
    const docRef = doc(collection(this.firestore, 'colors'));

    const currentUser = this.authService.getSignedInUid();
    if (currentUser) {
      // online storage
      await setDoc(docRef, {
        id: docRef.id,
        userId: currentUser,
        value,
        name,
        description,
        time: Timestamp.now(),
      });
    } else {
      // offline storage
      this.colors.push({
        id: docRef.id,
        userId: '',
        name,
        description,
        value,
        time: Timestamp.now(),
      });
      this.colors$.next(this.colors);
      localStorage.setItem('colors', JSON.stringify(this.colors));
    }

    return docRef.id;
  }
}
