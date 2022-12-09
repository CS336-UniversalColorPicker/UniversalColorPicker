import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Color } from '../interfaces/color';
import { AuthService } from '../services/auth.service';
import { ColorsService } from '../services/colors.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public colors: Color[] = [];

  constructor(
    private photoService: PhotoService,
    private colorService: ColorsService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,) {
    colorService.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  async signInButtonClicked() {
    let userIsSignedIn: boolean = !!this.authService.getCurrentUser();
    if (userIsSignedIn) {
      let loadingElement = await this.loadingController.create();
      await loadingElement.present();
      await this.authService.signUserOut();
      await loadingElement.dismiss();
    } else {
      this.navCtrl.navigateForward('/login');
    }
  }

  getSignInButtonText(): string {
    let userIsSignedIn: boolean = !!this.authService.getCurrentUser();
    return userIsSignedIn ? 'Sign Out' : 'Sign In';
  }

  takePhoto() {
    this.navCtrl.navigateForward('camera-page');
  }

  removeColor(color: Color) {
    this.colorService.removeColor(color.id);
  }
}
