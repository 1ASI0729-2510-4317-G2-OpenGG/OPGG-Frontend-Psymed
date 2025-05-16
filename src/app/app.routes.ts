import { Routes } from '@angular/router';
import {BannerPageComponent} from './public/pages/banner-page/banner-page.component';

export const routes: Routes = [
  { path: ''                                                        , redirectTo: 'home', pathMatch: 'full' },  // Default route that redirects to HomeComponent
  { path: 'home'                                                    , component: BannerPageComponent },
];
