import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveColorPage } from './save-color.page';

const routes: Routes = [
  {
    path: '',
    component: SaveColorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveColorPageRoutingModule {}
