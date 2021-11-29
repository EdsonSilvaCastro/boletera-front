import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowEventPageRoutingModule } from './show-event-routing.module';

import { ShowEventPage } from './show-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowEventPageRoutingModule
  ],
  declarations: [ShowEventPage]
})
export class ShowEventPageModule {}
