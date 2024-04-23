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
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Note } from '../../../models/note.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NoteService } from '../../../../core/note.service';
import { NewNoteComponent } from '../../new-note.component';
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
    NgIf,
    RouterLink,
    RouterLinkActive,
    NewNoteComponent,
  ],
  template: `
    <ul
      class="menu p-4 w-60 md:w-80 min-h-full bg-base-200 text-base-content relative"
    >
      <!-- NOTE LIST -->
      <notes-new-note class="mb-2"></notes-new-note>
      <li
        class="w-[90%] flex justify-between items-center flex-row flex-nowrap"
        *ngFor="let note of noteList"
      >
        <a
          routerLink="note/{{ note.id }}"
          routerLinkActive="activeNote"
          class="truncate relative duration-200 ease-in hide-child-icon"
          [class.opacity-40]="!note.title"
          *ngIf="note.id"
        >
          {{ note.title || '_notes.empty-title' | translate }}
        </a>
        <notes-icon
          icon="delete"
          class="hidden"
          size="default"
          (click)="deleteNote(note)"
        />
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
  styles: `
    .activeNote{
      @apply bg-primary text-white hover:bg-primary translate-x-[5%] w-[90%];

      & ~ notes-icon{
        display: block;
      }
    }
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

  /**
   * delete the notes and go to eliminated page
   * @param {Note} note the note that need to be eliminated
   */
  deleteNote(note: Note) {
    this.noteService.removeNote(note);
    this.router.navigateByUrl('/404', {
      state: {
        isEliminated: true,
      },
    });
  }
}
