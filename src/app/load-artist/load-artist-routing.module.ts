import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadArtistPage } from './load-artist.page';

const routes: Routes = [
  {
    path: '',
    component: LoadArtistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadArtistPageRoutingModule {}
