import { Routes } from '@angular/router';
import { NoteComponent } from './features/note.component';

export const routes: Routes = [
  { path: '', redirectTo: '/note/0', pathMatch: 'full' },
  { path: 'note/:noteId', component: NoteComponent },
];
