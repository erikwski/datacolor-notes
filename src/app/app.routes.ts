import { Routes } from '@angular/router';
import { NoteComponent } from './features/note.component';
import { Page404Component } from './features/page404.component';

export const routes: Routes = [
  // if the noteId is zero, the application create the first Note automatically
  { path: '', redirectTo: '/note/0', pathMatch: 'full' },
  { path: 'note/:noteId', component: NoteComponent },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' },
];
