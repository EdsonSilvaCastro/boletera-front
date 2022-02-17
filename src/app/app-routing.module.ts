import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {

  path: 'home',
  loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
 },
  {
    path: '',
    redirectTo: 'load-venue',
    pathMatch: 'full'
  },
  {
    path: 'load-venue',
    loadChildren: () => import('./load-venue/load-venue.module').then( m => m.LoadVenuePageModule)
  },
  {
    path: 'load-artist',
    loadChildren: () => import('./load-artist/load-artist.module').then( m => m.LoadArtistPageModule)
  },
  {
    path: 'show-event',
    loadChildren: () => import('./show-event/show-event.module').then( m => m.ShowEventPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
