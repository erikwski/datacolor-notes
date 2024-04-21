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
import { TitleCasePipe } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      lastUpdate: [''],
    });

    this.noteForm.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }
}
