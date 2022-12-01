import { Component } from '@angular/core';
import { CameraPreview, CameraPreviewOptions } from '@capgo/camera-preview';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public photoService: PhotoService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  takePhoto() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      height: 1920,
      width: 1080
    };

    CameraPreview.start(cameraPreviewOptions);
  }

}
