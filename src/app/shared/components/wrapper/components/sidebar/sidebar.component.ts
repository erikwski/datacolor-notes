import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { IconComponent } from '../../../icon.component';
import { ToggleLanguageComponent } from '../toggle-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Note } from '../../../../models/note.model';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NoteService } from '../../../../../core/note.service';
import { NewNoteComponent } from '../../../new-note.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
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
    FormsModule,
    DatePipe,
  ],
  templateUrl: './sidebar.component.html',
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

  /** value for filter the list of notes */
  filterText = '';

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

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // When navigate to a new router, clear text filter.
        // Trigger change detection cuz maybe the navigation is triggered by another components
        this.filterText = '';
        /** If mobile, close the sidebar before navigate */
        const menu = document.getElementById('toggle-menu') as HTMLInputElement;
        if (menu) menu.checked = false;
        this.cdr.detectChanges();
      });
  }

  /**
   * Return the notes that container filterText value
   */
  get filteredList(): Note[] {
    return this.noteList.filter((item) =>
      item.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
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
