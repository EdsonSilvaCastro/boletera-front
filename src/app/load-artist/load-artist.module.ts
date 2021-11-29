import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { LoadArtistPageRoutingModule } from './load-artist-routing.module';

import { LoadArtistPage } from './load-artist.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadArtistPageRoutingModule,
    BrowserModule
  ],
  declarations: [LoadArtistPage]
})
export class LoadArtistPageModule {}
