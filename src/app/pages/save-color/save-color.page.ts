import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'app-save-color',
  templateUrl: './save-color.page.html',
  styleUrls: ['./save-color.page.scss'],
})
export class SaveColorPage {

  public nameWasEmpty: boolean = false;

  public colorValue: string = '';
  public colorName: string = '';
  public colorDescription: string = '';

  constructor(
    public colorService: ColorsService,
    private navCtrl: NavController,
    private route: ActivatedRoute) {
    const colorValue = this.route.snapshot.paramMap.get('color');
    if (colorValue !== null) {
      this.colorValue = colorValue;
    }
  }

  onNameChange() {
    this.nameWasEmpty = false;
  }

  async save() {
    this.nameWasEmpty = !this.colorName;
    if (this.nameWasEmpty) {
      return;
    }
    
    await this.colorService.addColor(this.colorValue, this.colorName, this.colorDescription);
    this.navCtrl.navigateBack('');
  }

  cancel() {
    this.navCtrl.navigateBack('');
  }

}
