import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './public/components/language-switcher/language-switcher.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    LanguageSwitcherComponent
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-toolbar color="primary">
          <span>{{ 'APP_TITLE' | translate }}</span>
        </mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/doctor-dashboard">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span>{{ 'DASHBOARD' | translate }}</span>
          </a>
          <a mat-list-item routerLink="/doctor-dashboard/patients">
            <mat-icon matListItemIcon>people</mat-icon>
            <span>{{ 'PATIENTS' | translate }}</span>
          </a>
          <a mat-list-item routerLink="/doctor-dashboard/appointments">
            <mat-icon matListItemIcon>event</mat-icon>
            <span>{{ 'APPOINTMENTS' | translate }}</span>
          </a>
          <a mat-list-item routerLink="/doctor-dashboard/medical-records">
            <mat-icon matListItemIcon>folder_shared</mat-icon>
            <span>{{ 'MEDICAL_RECORDS' | translate }}</span>
          </a>
          <a mat-list-item routerLink="/doctor-dashboard/settings">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span>{{ 'SETTINGS' | translate }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>{{ 'APP_TITLE' | translate }}</span>

          <!-- Espacio flexible para alinear a la derecha -->
          <span class="spacer"></span>

          <!-- Componente de cambio de idioma -->
          <app-language-switcher></app-language-switcher>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .content {
      padding: 20px;
    }
    mat-toolbar {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `]
})
export class AppComponent {
  title = 'spymed';
  constructor(private translate: TranslateService) {
    // Configuración mejorada del idioma
    translate.setDefaultLang('es');

    const savedLang = localStorage.getItem('language');
    const browserLang = translate.getBrowserLang();


    const initialLang = savedLang || (browserLang?.match(/en|es/) ? browserLang : 'es');
    translate.use(initialLang);
  }
}
