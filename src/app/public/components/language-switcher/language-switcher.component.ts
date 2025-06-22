import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
  template: `
    <mat-button-toggle-group
      [value]="currentLang"
      name="language"
      aria-label="Language"
      (change)="changeLanguage($event.value)">
      <mat-button-toggle value="es">ES</mat-button-toggle>
      <mat-button-toggle value="en">EN</mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: [`
    mat-button-toggle-group {
      margin-left: 16px;
      height: 36px;
    }
    mat-button-toggle {
      padding: 0 12px;
      line-height: 36px;
    }
  `]
})
export class LanguageSwitcherComponent {
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang; // Usa el idioma activo
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang); // <-- Esta línea es esencial
    location.reload(); // Opcional: fuerza actualización (elimínala después de probar)
  }
}
