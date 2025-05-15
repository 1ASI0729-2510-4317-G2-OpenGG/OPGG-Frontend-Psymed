import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonToggle} from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggle
  ],
  templateUrl: './language-switcher.component.html',
  standalone: true,
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLang: string;
  languages = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
