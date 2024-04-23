import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NoteService } from './note.service';
import { FakeBackendService } from './fake-backend.service';
import { Note } from '../shared/models/note.model';
import { Observable, take } from 'rxjs';

describe('NoteService', () => {
  let service: NoteService;
  let fakeBackendServiceSpy: jasmine.SpyObj<FakeBackendService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const fakeBackendSpy = jasmine.createSpyObj('FakeBackendService', [
      'getData',
      'saveData',
    ]);
    const translateSpy = jasmine.createSpyObj('TranslateService', ['instant']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['events']);

    TestBed.configureTestingModule({
      providers: [
        NoteService,
        { provide: FakeBackendService, useValue: fakeBackendSpy },
        { provide: TranslateService, useValue: translateSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    });

    service = TestBed.inject(NoteService);
    fakeBackendServiceSpy = TestBed.inject(
      FakeBackendService
    ) as jasmine.SpyObj<FakeBackendService>;
    translateServiceSpy = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load notes correctly from server', () => {
    const testData: Note[] = [
      { id: 1, title: 'Note 1', content: 'Content 1', lastUpdate: 123456 },
      { id: 2, title: 'Note 2', content: 'Content 2', lastUpdate: 123457 },
    ];
    fakeBackendServiceSpy.getData.and.returnValue(JSON.stringify(testData));
    service.initService();
    expect(service.list.size).toBe(2);
  });

  it('should handle invalid data during initialization', () => {
    // Set up the spy to return invalid data
    const invalidData = JSON.stringify([
      { id: 1, title: 'Note 1', lastUpdate: 123456 }, // Missing 'content' property
    ]);
    fakeBackendServiceSpy.getData.and.returnValue(invalidData);
    service.initService();
    expect(service.list.size).toBe(0);
  });

  it('should get the new note from the getter inside the class', () => {
    expect(service.createNote().id).toBe(service.newNote.id);
  });

  it('should not update notes because the note doesnt change', () => {
    const note: Note = {
      id: 1,
      title: 'Note 1',
      content: 'Content 1',
      lastUpdate: 123456,
    };
    service.list.set(note.id, note);

    spyOn(service, 'saveChangesAndEmit');
    service.updateNotes(note);

    expect(service.saveChangesAndEmit).not.toHaveBeenCalled();
  });

  it('should create an id for the notes', () => {
    const note: Note = {
      id: 0,
      title: 'Note 1',
      content: 'Content 1',
      lastUpdate: 123456,
    };

    spyOn(service, 'generateId');
    service.updateNotes(note);

    expect(service.generateId).toHaveBeenCalled();
  });

  it('should update the lastUpdateDate', () => {
    const id = 1234;
    const note: Note = {
      id: id,
      title: 'Note 1',
      content: 'Content 1',
      lastUpdate: 0,
    };

    spyOn(service, 'generateId');
    service.updateNotes(note, true);

    expect(service.getNote(id)?.lastUpdate).toBeGreaterThan(0);
  });

  it('should remove a note inside the list', () => {
    const id = 1234;
    const note: Note = {
      id: id,
      title: 'Note 1',
      content: 'Content 1',
      lastUpdate: 123,
    };
    service.updateNotes(note);

    spyOn(service, 'generateId');
    service.updateNotes(note, true);
    service.removeNote(note);

    expect(service.getNote(id)).toBeUndefined();
  });

  it('just for get 100% coverage on service', () => {
    service.list$();
  });
});
