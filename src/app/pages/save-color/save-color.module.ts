import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveColorPageRoutingModule } from './save-color-routing.module';

import { SaveColorPage } from './save-color.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveColorPageRoutingModule
  ],
  declarations: [SaveColorPage]
})
export class SaveColorPageModule {}
