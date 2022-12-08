import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private photoService: PhotoService,
    private navCtrl: NavController,
    private route: ActivatedRoute,) { }

  takePhoto() {
    this.navCtrl.navigateForward('save-color');
  }

}
