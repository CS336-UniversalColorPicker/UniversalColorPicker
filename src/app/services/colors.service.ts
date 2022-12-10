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

  constructor(private firestore: Firestore) {
  }

  async load(userId: string | null) {
    if (userId !== null) {
      const colorCollection = collection(this.firestore, 'colors');
      const queriedData = query(colorCollection, where("userId", "==", userId));
      this.colors$ = collectionData(queriedData) as Observable<Color[]>;
    } else {
      this.colors$ = new Observable<Color[]>();
    }
  }

  getColors(): Observable<Color[]> {
    return this.colors$;
  }

  async removeColor(colorId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'colors', 'ShcdcGeV1BakmFLSaeWtfKKOy583', colorId));
  }

  async addColor(userId: string, value: string, name?: string, description?: string): Promise<string> {
    const docRef = doc(collection(this.firestore, 'colors'));

    await setDoc(docRef, {
      id: docRef.id,
      userId,
      value,
      name,
      description,
      time: Timestamp.now(),
    });

    return docRef.id;
  }
}
