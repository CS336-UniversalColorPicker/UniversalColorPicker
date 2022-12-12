import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Color } from '../interfaces/color';
import { AuthService } from '../services/auth.service';
import { ColorsService } from '../services/colors.service';
import { PhotoService } from '../services/photo.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public colors: Color[] = [];
  public signInButtonText: string = 'Sign In';

  private userIsSignedIn: boolean = false;
  private colorsSubscription: Subscription | undefined;

  constructor(
    private colorService: ColorsService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private auth: Auth) {

    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        this.signInButtonText = 'Sign Out';
      } else {
        this.signInButtonText = 'Sign In';
      }

      // unsubscribe from current subscription so we don't get old data after the new data (this bug made me sad for many hours)
      this.colorsSubscription?.unsubscribe();
      await this.colorService.load(user?.uid);
      this.colorsSubscription = this.colorService.getColors().subscribe(colors => {
        this.colors = colors;
      });
    });
  }

  async signInButtonClicked() {
    const currentUser = this.authService.getSignedInUid();
    let userWasSignedIn: boolean = !!currentUser;
    if (userWasSignedIn) {
      // sign out
      let loadingElement = await this.loadingController.create();
      await loadingElement.present();
      await this.authService.signUserOut();
      await loadingElement.dismiss();
    } else {
      // sign in
      await this.navCtrl.navigateForward('/login');
    }
  }

  takePhoto() {
    this.navCtrl.navigateForward('camera-page');
  }

  removeColor(color: Color) {
    this.colorService.removeColor(color.id);
  }

  async copyVal(color: Color) {
    this.clipboard.copy(color.value);
    const toast = await this.toastController.create({
      message: 'Copied to clipboard',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
