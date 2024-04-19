import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: ` <button class="btn btn-primary">Primary</button> `,
  styles: [],
})
export class AppComponent {
  title = 'datacolor-notes';
}
