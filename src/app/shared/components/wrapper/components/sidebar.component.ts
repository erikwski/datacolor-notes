import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { IconComponent } from '../../icon.component';
import { ToggleLanguageComponent } from './toggle-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Note } from '../../../models/note.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NoteService } from '../../../../core/note.service';
/**
 * @Description
 * Sidebar that hold notes, the button for creating a new one, and in the footer logo of the company & change language
 */
@Component({
  selector: 'notes-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    ToggleLanguageComponent,
    TranslateModule,
    UpperCasePipe,
    NgFor,
    AsyncPipe,
    NgIf,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <ul
      class="menu p-4 w-60 md:w-80 min-h-full bg-base-200 text-base-content relative"
    >
      <!-- NOTE LIST -->
      <li class="mb-2">
        <button class="btn btn-primary" (click)="addNote()">
          <notes-icon icon="write" size="sm" class="mr-2" />
          {{ '_notes.add' | translate | uppercase }}
        </button>
      </li>
      <li class="w-[90%] mx-auto" *ngFor="let note of noteList">
        <a
          routerLink="note/{{ note.id }}"
          routerLinkActive="bg-primary text-white hover:bg-primary"
          class="truncate"
          [class.opacity-40]="!note.title"
          *ngIf="note.id"
        >
          {{ note.title || '_notes.empty-title' | translate }}
        </a>
      </li>
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
      <notes-language-theme
        class="absolute bottom-2 right-2"
      ></notes-language-theme>
    </ul>
  `,
})
export class SidebarComponent implements OnInit {
  /** setted theme for render company logo in dark mode or light*/
  @Input({ required: true }) theme!: string;

  /** service for persintency */
  private noteService = inject(NoteService);

  /** service for persintency */
  private cdr = inject(ChangeDetectorRef);

  /** list update every update on noteList subject */
  noteList: Note[] = [];

  /** service for persintency */
  private router = inject(Router);

  /** Every change on noteList in the NoteService update the list of notes and trigger change detection  */
  ngOnInit(): void {
    this.noteService.list$().subscribe((list) => {
      this.noteList = list;
      this.cdr.detectChanges();
    });
  }

  /** create new notes and render it on the sidebar */
  addNote() {
    const note = this.noteService.createNotes();
    this.router.navigateByUrl('note/' + note.id);
  }
}
