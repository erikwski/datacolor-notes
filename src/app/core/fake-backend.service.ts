import { Injectable } from '@angular/core';
import { Note } from '../shared/models/note.model';
import { ServerKey } from '../shared/models/server-key.model';

/**
 * @Description
 * Wrapper for localStorage that simulate his methods
 */
@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  /**
   * Saves data to local storage.
   *
   * @param {string} key - The key under which the data will be stored.
   * @param {string} value - The data to be saved in local storage.
   */
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * This function retrieves data from local storage by specifying a unique key.
   * @param key The key associated with the data you want to retrieve.
   * @returns
   */
  public getData(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * This function delete data from local storage by specifying a unique key.
   * @param key The key associated with the data you want to delete.
   */
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clear all data saved in localStorage
   */
  public clearData() {
    localStorage.clear();
  }
}
