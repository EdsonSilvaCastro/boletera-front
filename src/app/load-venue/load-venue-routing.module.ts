import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadVenuePage } from './load-venue.page';

const routes: Routes = [
  {
    path: '',
    component: LoadVenuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadVenuePageRoutingModule {}
