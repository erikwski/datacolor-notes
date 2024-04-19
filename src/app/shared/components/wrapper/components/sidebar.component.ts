import { Component, Input } from '@angular/core';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'notes-sidebar',
  standalone: true,
  imports: [IconComponent],
  template: `
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content relative">
      <!-- NOTE LIST -->
      <li class="mb-2">
        <button class="btn btn-primary">
          <notes-icon icon="write" size="sm" class="mr-2" />
          NEW NOTES
        </button>
      </li>
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <!-- END NOTE LIST -->
      <a href="https://www.datacolor.com/">
        <img
          class="absolute bottom-2 opacity-40 duration-300 ease-in-out hover:opacity-100 hover:scale-110"
          [style.width.%]="50"
          [src]="
            theme === 'din'
              ? 'assets/images/darkLogo.png'
              : 'assets/images/logo.png'
          "
          alt="logo"
        />
      </a>
    </ul>
  `,
  styles: ``,
})
export class SidebarComponent {
  @Input({ required: true }) theme!: string;
}
