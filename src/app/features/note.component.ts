import { Component } from '@angular/core';
import { EditableComponent } from './components/editable.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'notes-note',
  standalone: true,
  imports: [EditableComponent, FormsModule, ReactiveFormsModule],
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
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      lastUpdate: [''],
    });

    this.myForm.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }
}
