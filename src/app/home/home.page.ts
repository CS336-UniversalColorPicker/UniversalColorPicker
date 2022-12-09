import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Color } from '../interfaces/color';
import { ColorsService } from '../services/colors.service';
import { PhotoService } from '../services/photo.service';
import { Clipboard } from '@angular/cdk/clipboard';

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
    private clipboard: Clipboard,
    private toastController: ToastController,) {
    colorService.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  takePhoto() {
    this.navCtrl.navigateForward('camera-page');
  }

  removeColor(color: Color) {
    this.colorService.removeColor(color.id);
  }

  async copyVal(color: Color) {
    this.clipboard.copy(color.value);
    console.log('Hex copied');
    const toast = await this.toastController.create({
      message: 'Copied to clipboard',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
