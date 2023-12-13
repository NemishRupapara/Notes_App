
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteService } from './note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: { title: string, content: string, mycolor: string }[] = [];
  newNote: { title: string, content: string, mycolor: string } = { title: '', content: '', mycolor: '' };
  editedNote: { title: string, content: string, mycolor: string } = { title: '', content: '', mycolor: '' };
  editedIndex!: number;
  isHovered!: boolean;

  constructor(private noteService: NoteService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

  addNote(): void {
    if (this.newNote.title && this.newNote.content) {
      this.noteService.addNote(this.newNote);
      this.notes = this.noteService.getNotes();
      this.newNote = { title: '', content: '', mycolor: '' }; // Clear the form
      this.modalService.dismissAll(); // Close the modal
    }
  }

  editNote(index: number): void {
    this.editedNote = { ...this.notes[index] };
    this.editedIndex = index;
  }

  deleteNote(index: number): void {
    this.noteService.deleteNote(index);
    this.notes = this.noteService.getNotes();
  }

  updateNote(): void {
    if (this.editedNote.title && this.editedNote.content) {
      this.noteService.editNote(this.editedIndex, this.editedNote);
      this.notes = this.noteService.getNotes();
      this.editedNote = { title: '', content: '', mycolor: '' };
      this.modalService.dismissAll();
    }
  }

  onColorChange(newColor: string): void {
    this.newNote.mycolor = newColor;
  }

  onEditedColorChange(newColor: string): void {
    this.editedNote.mycolor = newColor;
  }
}

