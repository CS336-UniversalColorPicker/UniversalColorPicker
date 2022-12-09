import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public lastPhoto?: UserPhoto;
  // public photos: UserPhoto[] = [];

  constructor(
    private navCtrl: NavController,
  ) { }

  public async takePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).catch((e) => {
      this.navCtrl.navigateBack('');
      return;
    });

    // this.photos.unshift({
    //   filepath: "soon...",
    //   webviewPath: capturedPhoto.webPath!,
    // });

    if (capturedPhoto) {
      this.lastPhoto = {
        filepath: "soon...",
        webviewPath: capturedPhoto.webPath!,
      };
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
