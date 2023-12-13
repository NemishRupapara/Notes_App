import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: { title: string, content: string,mycolor:string }[] = [];

  constructor() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
  }

  getNotes(): { title: string, content: string,mycolor:string }[] {
    return this.notes;
  }

  addNote(note: { title: string, content: string ,mycolor:string}): void {
    this.notes.push(note);
    this.saveNotes();
    
  }

  editNote(index: number, note: { title: string, content: string,mycolor:string }): void {
    this.notes[index] = note;
    this.saveNotes();
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    this.saveNotes();
  }

   saveNotes(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
