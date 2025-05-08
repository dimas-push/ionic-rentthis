import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRegisterPageRoutingModule } from './tab-register-routing.module';

import { TabRegisterPage } from './tab-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRegisterPageRoutingModule
  ],
  declarations: [TabRegisterPage]
})
export class TabRegisterPageModule {}
