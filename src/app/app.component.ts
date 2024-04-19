import { Component } from '@angular/core';
import { WrapperComponent } from './shared/components/wrapper/wrapper.component';
import { onPasteOnEl } from './shared/utils/onPaste';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WrapperComponent],
  templateUrl: './app.component.html',
  styles: `
  @media (max-width: 1023px) { 
      #note-container{
        height: calc(100% - 40px);
      }
    }
  `,
})
export class AppComponent {
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
