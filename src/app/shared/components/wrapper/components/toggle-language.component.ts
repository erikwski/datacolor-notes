import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconComponent } from '../../icon.component';
import { FakeBackendService } from '../../../../core/fake-backend.service';
import { ServerKey } from '../../../models/server-key.model';
import { Language } from '../../../models/language.model';

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
  styles: `
  .swap-on{
    opacity: 0;
    z-index: -1;
  }

  // override swap-off style
  .swap input:checked ~ .swap-off{
    opacity: 1;
  }
`
})
export class ToggleLanguageComponent {
  constructor(
    private translateService: TranslateService,
    private server: FakeBackendService
  ) {}

  /** return current language setted for translation */
  get currentLang() {
    return this.translateService.currentLang;
  }

  /**
   * Change the language dynamically without a page refresh based on the current language setting.
   * If the language is English, change it to Italian, and vice versa.
   */
  setLang() {
    const language =
      this.currentLang === Language.ENGLISH
        ? Language.ITALIAN
        : Language.ENGLISH;
    this.server.saveData(ServerKey.LANGUAGE, language);
    this.translateService.use(language);
  }
}
