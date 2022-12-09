import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { UserCredential } from '@angular/fire/auth';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public emailAddress: string = '';
  public password: string = '';
  public confirmationPassword: string = '';

  public submitButtonText: string = 'Sign In';

  public mode: 'signin' | 'signup' = 'signin';
  public emailError: boolean = false;
  public passwordError: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController,
    private colorService: ColorsService) { }

  ngOnInit() {
  }

  onEmailUpdate() {
    if (!!this.emailAddress) {
      this.emailError = false;
    }
  }

  onPasswordUpdate() {
    if (!!this.passwordError) {
      this.passwordError = false;
    }
  }

  goToCreateAccountMode() {
    this.mode = 'signup';
    this.submitButtonText = 'Create Account';
  }

  async handleError(error: string): Promise<void> {
    if (error === 'auth/invalid-email') {
      this.emailError = true;
    } else if (error === 'auth/wrong-password') {
      this.passwordError = true;
    } else {
      let alertMessage: string = `Unknown error occurred: ${error}`;

      if (error === 'auth/network-request-failed') {
        alertMessage = 'Error connecting to authentication servers; try again later.';
      }

      const alert = await this.alertController.create({
        message: alertMessage,
        buttons: [{
          text: 'Ok',
          role: 'cancel',
        }],
      });
      alert.present();
    }
  }

  async resetPassword() {
    // make sure there's an email
    if (!!!this.emailAddress) {
      this.emailError = true;
      return;
    }

    let loadingElement = await this.loadingController.create();
    await loadingElement.present();

    await this.authService
      .resetPassword(this.emailAddress)
      .catch((error) => this.handleError(error.code));

    const alert = await this.alertController.create({
      message: `A password reset email has been sent to ${this.emailAddress}`,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
      }],
    });
    alert.present();

    await loadingElement.dismiss();
  }

  async submit() {
    // make sure there's an email address
    if (!!!this.emailAddress) {
      this.emailError = true;
      return;
    }

    let loadingElement = await this.loadingController.create();
    await loadingElement.present();

    let signInError: string | undefined;
    let toastMessage: string | undefined;

    switch (this.mode) {
      case 'signin':
        await this.authService
          .signUserIn(this.emailAddress, this.password)
          .then(() => toastMessage = 'Signed in successfully!')
          .catch((error) => signInError = error.code);
        break;
      case 'signup':
        await this.authService
          .createAccount(this.emailAddress, this.password)
          .then(() => toastMessage = 'Created account successfully!')
          .catch((error) => signInError = error.code);
        break;
    }

    await loadingElement.dismiss();

    if (!!signInError) {
      // handle the error and return early so we don't go back to home
      this.handleError(signInError);
      return;
    }

    // display success message
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
    
    // go home
    this.navController.navigateBack('');
  }
}
