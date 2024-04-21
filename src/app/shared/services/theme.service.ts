import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /** default theme of the app (dark) */
  defaultTheme = Theme.DIN;
  /** theme actually active */
  private _activeTheme = this.defaultTheme;

  /** getter for private activeTheme, use toggle method for change theme */
  get activeTheme(): Theme {
    return this._activeTheme;
  }

  /** set dark theme if light is setted and vice versa  */
  toggle() {
    const HTML = document.querySelector('html');
    if (HTML) {
      this._activeTheme =
        this._activeTheme == Theme.DIN ? Theme.WINTER : Theme.DIN;
      HTML.setAttribute('data-theme', this._activeTheme);
    } else {
      console.warn('Cannot edit the theme, HTML tag is undefined');
    }
  }
}
