import { Component, OnInit } from '@angular/core';
import { GetIdService } from '../auth/get-id.service';
import { DeleteService } from '../services/delete.service';
import { GetUserNotesService } from '../services/get-user-notes.service';
import { Spinkit } from 'ng-http-loader';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  error: string = '';

  constructor(
    private getid: GetIdService,
    public deleting: DeleteService,
    public notes: GetUserNotesService,
    public getPage: ShareService
  ) {}

  public spinkit = Spinkit.skCubeGrid;
  

  userid!: number;
  note: any;
  name!: string;
  p: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this.getid.getID().subscribe({
      next: (decoded: any) => {
        this.name = decoded.decoded.name;
        this.userid = decoded.decoded.id;

        console.log(decoded.decoded.id);

        this.notes.getUserNotes(this.userid).subscribe({
          next: (res: any) => {
            this.note = res;
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
}
