import { Component } from '@angular/core';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-banner-page',
  imports: [
    ToolbarComponent
  ],
  templateUrl: './banner-page.component.html',
  standalone: true,
  styleUrl: './banner-page.component.css'
})
export class BannerPageComponent {

}
