import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Color } from '../interfaces/color';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private colors$ = new Observable<Color[]>();
  private colors: Color[] = [];

  constructor(
    private firestore: Firestore,
    private authService: AuthService) {
  }

  async load(userId: string | null) {
    console.log(`user id: ${userId}`);
    if (userId !== null) {
      const colorCollection = collection(this.firestore, 'colors');
      const queriedData = query(colorCollection, where("userId", "==", userId));
      this.colors$ = collectionData(queriedData) as Observable<Color[]>;
    } else {
      this.colors$ = new Observable<Color[]>();
    }
  
    // this.colors = [];
    // this.colors$.subscribe(colors => {
    //   console.log(`here are the colors ${colors}`);
    //   this.colors = colors;
    // });
  }

  getColors(): Observable<Color[]> {
    return this.colors$;
  }

  async removeColor(colorId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'colors', colorId));
  }

  async addColor(value: string, name?: string, description?: string): Promise<string> {
    const docRef = doc(collection(this.firestore, 'colors'));

    await setDoc(docRef, {
      id: docRef.id,
      uid: 'ShcdcGeV1BakmFLSaeWtfKKOy583',
      value,
      name,
      description,
      time: Timestamp.now(),
    });

    return docRef.id;
  }
}
