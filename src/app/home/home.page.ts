import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public signInButtonText: string = "Sign In";

  private userIsSignedIn: boolean = false;
  private colorsSubscription: Subscription | undefined;

  constructor(
    private photoService: PhotoService,
    private colorService: ColorsService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private auth: Auth) {
    onAuthStateChanged(auth, (user: User | null) => {
      this.userIsSignedIn = !user;
      if (user) {
        this.signInButtonText = 'Sign Out';
        this.userIsSignedIn = true;
      } else {
        this.signInButtonText = 'Sign In';
        this.userIsSignedIn = false;
      }
      this.refreshColors(user?.uid ?? null);
    });
  }

  async refreshColors(currentUser: string | null) {
    await this.colorService.load(currentUser);
    this.colorsSubscription = this.colorService.getColors().subscribe(colors => {
      if (this.userIsSignedIn) {
        this.colors = colors;
      } else {
        this.colors = [];
      }
    });
  }

  async signInButtonClicked() {
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser ?? null);
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

  getSignInButtonText(): string {
    const currentUser = this.authService.getCurrentUser();
    let userIsSignedIn: boolean = !!currentUser;
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
