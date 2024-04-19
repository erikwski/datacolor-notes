import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  defaultTheme = Theme.DIN;
  private _activeTheme = this.defaultTheme;

  get activeTheme(): Theme {
    return this._activeTheme;
  }

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
