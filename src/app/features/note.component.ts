import { Component, OnInit } from '@angular/core';
import { EditableComponent } from './components/editable.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FakeBackendService } from '../core/fake-backend.service';
import { ServerKey } from '../shared/models/server-key.model';
import { Note } from '../shared/models/note.model';
import { NoteService } from '../core/note.service';
import { whitespaceValidator } from './validators/white-space.validator';
import { filter } from 'rxjs';

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
    UpperCasePipe,
  ],
  templateUrl: './note.component.html',
})
export class NoteComponent implements OnInit {
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
      title: ['', Validators.required, whitespaceValidator],
      content: [''],
      lastUpdate: [null],
    });
  }

  ngOnInit() {
    this.routeParam.params.subscribe((params) => {
      const noteId = +params['noteId'];
      let note: Note | undefined;
      if (noteId == 0) {
        note = this.server.createNote();
        this.router.navigateByUrl('note/' + note.id);
        return;
      }
      note = this.server.getNote(noteId);
      if (note) {
        this.initForm(note);
        this.noteForm.valueChanges.subscribe((res: Note) => {
          //Update only if valid (title have a value and note have an id)
          if (this.noteForm.valid) this.server.updateNotes(res, true);
        });
      } else {
        // note that the user want to load doesn't exist anymore
        this.router.navigateByUrl('/404');
      }
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

  /** return the value of the form for the title */
  get title() {
    return this.noteForm.controls['title'].value;
  }

  /** return the value of the form for the lastUpdate */
  get lastUpdateNote() {
    return this.noteForm.controls['lastUpdate'].value;
  }
}
