import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public lastPhoto?: UserPhoto;
  // public photos: UserPhoto[] = [];

  constructor() { }

  public async takePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // this.photos.unshift({
    //   filepath: "soon...",
    //   webviewPath: capturedPhoto.webPath!,
    // });

    this.lastPhoto = {
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!,
    };
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
