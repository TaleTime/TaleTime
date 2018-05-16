import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditsPage } from './credits';

@NgModule({
  declarations: [
    CreditsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditsPage),
  ],
})
export class CreditsPageModule {}
