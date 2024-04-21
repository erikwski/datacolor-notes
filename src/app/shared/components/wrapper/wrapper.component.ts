import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon.component';
import { ThemeService } from '../../services/theme.service';
import { SidebarComponent } from './components/sidebar.component';
import { ToggleThemeComponent } from './components/toggle-theme.component';

/**
 * @Description
 * Wrapper Component for Secondary Features and Notes Sidebar, pass inside the tag the main content of the page
 */
@Component({
  selector: 'notes-wrapper',
  standalone: true,
  imports: [IconComponent, SidebarComponent, ToggleThemeComponent],
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {
  private themeService = inject(ThemeService);

  /** return active theme */
  get theme() {
    return this.themeService.activeTheme;
  }
}
