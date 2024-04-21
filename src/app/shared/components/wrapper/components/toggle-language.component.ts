import { Component, EventEmitter, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconComponent } from '../../icon.component';
import { FakeBackendService } from '../../../../core/fake-backend.service';
import { languageKey } from '../../../models/key.model';

/**
 * @Description
 * Show the flag of the current language and on click change dinamically the theme
 */
@Component({
  selector: 'notes-language-theme',
  standalone: true,
  imports: [IconComponent],
  template: `
    <label class="swap absolute bottom-2 right-2">
      <input type="checkbox" (change)="setLang()" />
      <div class="swap-{{ currentLang === 'en' ? 'on' : 'off' }}">
        <notes-icon icon="italian" size="sm"></notes-icon>
      </div>
      <div class="swap-{{ currentLang === 'en' ? 'off' : 'on' }}">
        <notes-icon icon="english" size="sm"></notes-icon>
      </div>
    </label>
  `,
})
export class ToggleLanguageComponent {
  constructor(
    private translateService: TranslateService,
    private server: FakeBackendService
  ) {
    //retrieve the preferred language, if no exist english will be setted
    const language = this.server.getData(languageKey) ?? 'en';
    translateService.setDefaultLang(language);

    translateService.use(language);
  }
  /** return current language setted for translation */
  get currentLang() {
    return this.translateService.currentLang;
  }

  /**
   * Change the language dynamically without a page refresh based on the current language setting.
   * If the language is English, change it to Italian, and vice versa.
   */
  setLang() {
    const language = this.currentLang === 'en' ? 'it' : 'en';
    this.server.saveData(languageKey, language);
    this.translateService.use(language);
  }
}
