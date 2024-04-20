import { Component } from '@angular/core';
import { WrapperComponent } from './shared/components/wrapper/wrapper.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WrapperComponent, RouterOutlet],

  templateUrl: './app.component.html',
  styles: `
   #note-container{
    height: calc(100% - 40px);
  }
  `,
})
export class AppComponent {}
