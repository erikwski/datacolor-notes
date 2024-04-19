import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon.component';
import { ThemeService } from '../../services/theme.service';
import { SidebarComponent } from './components/sidebar.component';
import { ToggleThemeComponent } from './components/toggle-theme.component';
import { Theme } from '../../models/theme.model';

@Component({
  selector: 'notes-wrapper',
  standalone: true,
  imports: [IconComponent, SidebarComponent, ToggleThemeComponent],
  templateUrl: './wrapper.component.html',
  styles: `
    // overflow 100vh cuz added padding to the main container and want to prevent the scroll
    @media (min-width: 1024px) { 
      .drawer-side{
        height: calc(100vh - 1rem);
      }
    }
    // manage scroll inside the content
    .drawer-content{
      height: calc(100vh - 1rem);
    }
  `,
})
export class WrapperComponent {
  private themeService = inject(ThemeService);

  get theme() {
    return this.themeService.activeTheme;
  }
}
