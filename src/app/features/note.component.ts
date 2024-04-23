import { Component } from '@angular/core';
import { EditableComponent } from './components/editable.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeBackendService } from '../core/fake-backend.service';
import { ServerKey } from '../shared/models/server-key.model';
import { Note } from '../shared/models/note.model';
import { NoteService } from '../core/note.service';

/**
 * @Description
 * Display the content of the loaded note.
 * If the note doesn't exist redirect to the 404 page if the id have a value that doesn't exist.
 */
@Component({
  selector: 'notes-note',
  standalone: true,
  imports: [
    EditableComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TitleCasePipe,
    NgIf,
    DatePipe,
  ],
  templateUrl: './note.component.html',
  styles: `
  // Edit scrollbar only for pc, keep the default for mobile 
    @media (hover: hover) {
      *::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 2px;
      }
      *::-webkit-scrollbar-thumb { 
        @apply bg-base-300;
      }
    }
  `,
})
export class NoteComponent {
  /** contains id, title, content and lastUpdate of the note */
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routeParam: ActivatedRoute,
    private router: Router,
    private server: NoteService
  ) {
    this.noteForm = this.fb.group({
      id: [null, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      lastUpdate: [null],
    });
    this.routeParam.params.subscribe((params) => {
      let note = this.server.getNote(+params['noteId']);
      if (!note) {
        note = this.server.createNotes();
        this.router.navigateByUrl('note/' + note.id);
      }
      this.initForm(note);
      this.noteForm.valueChanges.subscribe((res: Note) => {
        this.server.updateNotes(res, true);
      });
    });
  }
  /**
   * init form and add subcription that update the value if the note is valid
   * @param {Note} note note data for set the value on the form
   * */
  initForm(note: Note) {
    this.noteForm.patchValue(note);
  }

  /** return if need to render a note or notes are not selected */
  get isNote() {
    return this.noteForm.controls['id'].value;
  }

  /** return if need to render a note or notes are not selected */
  get lastUpdateNote() {
    return this.noteForm.controls['lastUpdate'].value;
  }
}
