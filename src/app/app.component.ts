import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { ColorsService } from './services/colors.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {

  }
}
