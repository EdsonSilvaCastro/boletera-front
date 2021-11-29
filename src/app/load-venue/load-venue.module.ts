import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoadVenuePageRoutingModule } from './load-venue-routing.module';

import { LoadVenuePage } from './load-venue.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadVenuePageRoutingModule
  ],
  declarations: [LoadVenuePage]
})
export class LoadVenuePageModule {}
