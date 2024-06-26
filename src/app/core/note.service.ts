import { Injectable, inject } from '@angular/core';
import { FakeBackendService } from './fake-backend.service';
import { Note } from '../shared/models/note.model';
import { ServerKey } from '../shared/models/server-key.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  /** FakeBackendService instance */
  private server = inject(FakeBackendService);
  /** ngx-translate service for translation */
  private translateService = inject(TranslateService);
  /** router for intercept navigation */
  private router = inject(Router);
  /** Map used for call the getData only one time and update the list with O(log n) complexity */
  public list = new Map<number, Note>();
  /** Sidebar subscribe to this for update the value every changes */
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    this.initService();
    // ! update list of the notes when navigate to a new note,
    // ! didn't like the effect so i avoid to use it but that was a requirement so i let it here
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     // sort note every time that the navigation change
    //     const notesList = Array.from(this.list.values());
    //     this.list.clear();
    //     for (let note of this.defaultSort(notesList)) {
    //       this.list.set(note.id, note);
    //     }
    //     this.notesSubject.next(Array.from(this.list.values()));
    //   });
  }

  /** init the service with a map of notes and add some control if the value saved is not format correctly */
  initService() {
    let data: Note[];
    try {
      data = JSON.parse(this.server.getData(ServerKey.NOTES) ?? '') as Note[];
      // Sorting the array by timestamp from most recent to older one
      this.defaultSort(data).forEach((val) => {
        // validate interface checking if data have the correct attributes, if not trigger error and set empty noteList cuz
        // the user may have changed manually in localStorage
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
  createNote() {
    const note = this.newNote;
    // reorder notes list to append it as first element (most recent)
    let oldList = Array.from(this.list.values());
    this.list.clear();
    oldList.unshift(note);
    oldList.forEach((note) => this.list.set(note.id, note));

    this.saveChangesAndEmit();
    return note;
  }

  /** delete a note */
  removeNote(note: Note) {
    this.list.delete(note.id);
    this.saveChangesAndEmit();
  }

  /**
   * if the notes already exist, update it. If not create a new one
   * @param {Note} note the note that need to be updated
   * @param {boolean} updateDate if true, the lastUpdateDate of the note will be updated
   * */
  updateNotes(note: Note, updateDate = false) {
    const oldNote = this.list.get(note.id);
    // avoid call if title and content aren't change
    // (when the noteComponent are already loaded and navigate to the new Note update the form and trigger update)
    if (
      oldNote &&
      oldNote.title == note.title &&
      oldNote.content == note.content
    ) {
      return;
    }
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

  /**
   * Sort array based on lastUpdate
   * @param {Note[]} list the list that need to be sorted
   * @returns
   */
  defaultSort(list: Note[]) {
    return list.sort((a, b) => b.lastUpdate - a.lastUpdate);
  }

  /** Create a unique id using timestamp */
  generateId(): number {
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
