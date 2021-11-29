import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowEventPage } from './show-event.page';

const routes: Routes = [
  {
    path: '',
    component: ShowEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowEventPageRoutingModule {}
