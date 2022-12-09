import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Color } from '../interfaces/color';
import { AuthService } from '../services/auth.service';
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
    private photoService: PhotoService,
    private colorService: ColorsService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private clipboard: Clipboard,
    private toastController: ToastController) {
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
