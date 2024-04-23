import { Component } from '@angular/core';
import { IconComponent } from './icon.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'notes-new-note',
  standalone: true,
  imports: [IconComponent, RouterLink, TranslateModule, UpperCasePipe],
  template: `
    <button class="btn btn-primary w-full" routerLink="/note/0">
      <notes-icon icon="write" size="sm" class="mr-2" />
      {{ '_notes.add' | translate | uppercase }}
    </button>
  `,
})
export class NewNoteComponent {}
