import { Component } from '@angular/core';
import { onPasteOnEl } from '../shared/utils/onPaste';

@Component({
  selector: 'notes-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
})
export class NoteComponent {
  onPaste(e: any) {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.Clipboard;
    const pastedText = clipboardData.getData('text/plain');

    // Do something with the pasted text, for example, log it to the console
    console.log('Pasted text:', pastedText);

    try {
      onPasteOnEl(e.target, pastedText);
    } catch (error) {
      console.error("Errore nel parse del testo pre paste sull'input", error);
    }
  }
}
