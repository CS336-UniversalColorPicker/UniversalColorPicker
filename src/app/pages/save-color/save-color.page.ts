import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Color } from 'src/app/interfaces/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'app-save-color',
  templateUrl: './save-color.page.html',
  styleUrls: ['./save-color.page.scss'],
})
export class SaveColorPage implements OnInit {

  public nameWasEmpty: boolean = false;

  public colorValue: string = '';
  public colorName: string = '';
  public colorDescription: string = '';

  public imageSource: string = "https://docs-demo.ionic.io/assets/madison.jpg";

  constructor(
    public colorService: ColorsService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private auth: AuthService) {
    const colorValue = this.route.snapshot.paramMap.get('color');
    if (colorValue !== null) {
      this.colorValue = colorValue;
    }
  }

  ngOnInit() {
  }

  onNameChange() {
    this.nameWasEmpty = false;
  }

  save() {
    this.nameWasEmpty = !this.colorName;
    if (this.nameWasEmpty) {
      return;
    }

    const currentUser = this.auth.getUserId();
    if (currentUser) {
      this.colorService.addColor(currentUser, this.colorValue, this.colorName, this.colorDescription);
    } else {
      // TODO
      console.log("no account when saving. bad bad bad bad aba");
    }
    this.navCtrl.navigateBack('');
  }

  cancel() {
    this.navCtrl.navigateBack('');
  }

}
