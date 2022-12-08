import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    public colorService: ColorsService,
    private navCtrl: NavController,
    private route: ActivatedRoute) {
    colorService.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  takePhoto() {
    this.navCtrl.navigateForward('save-color');
  }

}
