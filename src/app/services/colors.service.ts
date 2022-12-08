import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Color } from '../interfaces/color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  public colors$ = new Observable<Color[]>();
  private colors: Color[] = [];

  constructor(private firestore: Firestore) {
    this.load();
  }

  async load(): Promise<void> {
    const colorCollection = collection(this.firestore, 'colors');
    this.colors$ = collectionData(colorCollection) as Observable<Color[]>;
    this.colors$.subscribe(colors => {
      this.colors = colors;
    });
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
      value,
      name,
      description,
      time: Timestamp.now(),
    });

    return docRef.id;
  }
}
