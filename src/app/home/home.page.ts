import { Component } from '@angular/core';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { Color } from '../interfaces/color';
import { ColorsService } from '../services/colors.service';
// import { CameraPreview, CameraPreviewOptions } from '@capgo/camera-preview';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public colors: Color[] = [];

  constructor(
    public photoService: PhotoService,
    public colorService: ColorsService) {
    colorService.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  takePhoto() {
  }

}
