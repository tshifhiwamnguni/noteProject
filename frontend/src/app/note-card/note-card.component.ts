import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetIdService } from '../auth/get-id.service';
import { DeleteService } from '../services/delete.service';
import { GetUserNotesService } from '../services/get-user-notes.service';
import { ShareService } from '../services/share.service';
import { Spinkit } from 'ng-http-loader';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditService } from '../services/edit.service';
import { GetOneNoteService } from '../services/get-one-note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  userId: any;
  public notes: any;
  success: string = '';
  error: string = '';
  title: any;
  note: any;

  users:any;
  p: number = 1;
  total: number = 0;

  constructor(
    public getUsersNote: GetUserNotesService,
    private getid: GetIdService,
    public deleting: DeleteService,
    private router: Router,
    private route: ActivatedRoute,
    public share: ShareService,
    private edit: EditService,
    private getOneUserNote: GetOneNoteService
  ) {}

  public spinkit = Spinkit.skCubeGrid;

  ngOnInit(): void {
    this.getid.getID().subscribe({
      next: (decoded: any) => {
        this.userId = decoded.decoded.id;
        console.log(this.userId)
        // get the users notes
        this.getUsersNote.getUserNotes(this.userId).subscribe({
          next: (res: any) => {
            this.notes = res;
            this.share.notes = this.notes;
            this.share.holdNotes = this.notes;
          },
          error: (err) => {
            this.error = err.error;
            setTimeout(() => {
              this.error = '';
            }, 2000);
          },
        });
      },
      error: (error: any) => {
        this.error = error.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  save() {
    const id = localStorage.getItem('id');
    let editNote = {
      id: id,
      user_id: this.userId,
      title: this.title,
      note: this.htmlContent,
      private: false,
    };

    this.edit.edit(editNote).subscribe({
      next: (res: any) => {
        this.success = res.success;
        setTimeout(() => {
          this.success = '';
        }, 2000);
      },
      error: (err: any) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  post: object = {};

  postValue!: number;
  holdTitle!: string;
  send(num: any) {
    this.postValue = num;
    this.holdTitle = this.notes[num].title;
  }

  deleteOne() {
    this.delete(this.postValue);
  }
  delete(num: any) {
    const id = this.notes[num].id;
    const user_id = this.userId;

    this.deleting.delete(id, user_id).subscribe({
      next: (res: any) => {
        this.deleting.success = res.success;
        this.success = res.success;
        setTimeout(() => {
          this.success = '';
          this.deleting.success = '';

          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/note'], { relativeTo: this.route });
        }, 2000);
      },
      error: (err: any) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  id!: number;
  edits(num: any) {
    this.id = this.share.notes[num].id;
    this.getEditValues(this.id);
  }

  getEditValues(cardId: any) {
    this.getOneUserNote.getOneNote(cardId).subscribe({
      next: (res: any) => {
        this.note = res[0];
        this.htmlContent = this.note.note;
        this.title = this.note.title;
      },
      error: (err) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  edited: boolean = false;

  saveEdits() {
    let editNote = {
      id: this.id,
      user_id: this.userId,
      title: this.title,
      note: this.htmlContent,
      private: false,
    };

    this.edit.edit(editNote).subscribe({
      next: (res: any) => {
        this.success = res.success;
        this.edited = true;
        setTimeout(() => {
          this.success = '';
        }, 2000);
      },
      error: (err: any) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  exit() {
    if (this.edited) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/note'], { relativeTo: this.route });
    }
  }

  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    translate: 'yes',
    width: '100%',
    height: '20rem',
    outline: true,
    minHeight: '20rem',
    placeholder: 'Start writing your note....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['insertImage', 'insertVideo']],
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };
}
