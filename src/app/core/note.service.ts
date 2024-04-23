import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { FakeBackendService } from './fake-backend.service';
import { Note } from '../shared/models/note.model';
import { ServerKey } from '../shared/models/server-key.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  /** FakeBackendService instance */
  private server = inject(FakeBackendService);
  /** ngx-translate service for translation */
  private translateService = inject(TranslateService);
  /** Map used for call the getData only one time and update the list with O(log n) complexity */
  public list = new Map<number, Note>();
  /** Sidebar subscribe to this for update the value every changes */
  private notesSubject = new BehaviorSubject<Note[]>([]);

  /** init the service with a map of notes and add some control if the value saved is not format correctly */
  constructor() {
    let data: Note[];
    try {
      data = JSON.parse(this.server.getData(ServerKey.NOTES) ?? '') as Note[];
      // validate interface checking if data have the correct attributes, if not trigger error and set empty noteList cuz
      // the user may have changed manually in localStorage
      data.forEach((val) => {
        if (
          !(
            val.hasOwnProperty('id') &&
            val.hasOwnProperty('title') &&
            val.hasOwnProperty('content') &&
            val.hasOwnProperty('lastUpdate')
          )
        )
          throw new Error('Invalid interface');
        this.list.set(val.id, val);
      });
    } catch (error) {
      console.warn(error);
    }
    this.saveChangesAndEmit();
  }
  /** cast the subject asObservable */
  list$(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }
  /** return the Note using id
   * @param {string} id the id of the note that we want to load
   */
  getNote(id: number) {
    return this.list.get(id);
  }

  /** create new empty note */
  createNotes() {
    const note = this.newNote;
    this.list.set(note.id, note);
    this.saveChangesAndEmit();
    return note;
  }

  /** if the notes already exist, update it. If not create a new one */
  updateNotes(note: Note, updateDate = false) {
    if (!note.id) note.id = this.generateId();
    if (updateDate) note.lastUpdate = Date.now();
    this.list.set(note.id, note);
    this.saveChangesAndEmit();
  }

  /** call this function every change that need to be saved and update the Subject  */
  saveChangesAndEmit() {
    this.server.saveData(
      ServerKey.NOTES,
      JSON.stringify(Array.from(this.list.values()))
    );
    this.notesSubject.next(Array.from(this.list.values()));
  }

  /** Create a unique id using timestamp */
  private generateId(): number {
    return Date.now();
  }

  /** generate new note object */
  get newNote(): Note {
    return {
      id: this.generateId(),
      title: this.translateService.instant('_notes.new-title'),
      content: '',
      lastUpdate: Date.now(),
    };
  }
}
