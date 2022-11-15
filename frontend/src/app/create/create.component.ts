import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// importing the stuff needed for text editor
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GetIdService } from '../auth/get-id.service';
import { CreateService } from '../services/create.service';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  public spinkit = Spinkit.skCubeGrid;

  constructor(
    private getid: GetIdService,
    private create: CreateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  title: string = '';
  userId!: number;
  success: string = '';
  error: string = '';

  ngOnInit(): void {
    this.getid.getID().subscribe({
      next: (decoded: any) => {
        this.userId = decoded.decoded.id;
      },
      error: (error: any) => {
        console.log(error.error);
      },
    });
  }

  save() {
    let note = {
      user_id: this.userId,
      title: this.title,
      note: this.htmlContent,
      private: false,
    };

    this.create.create(note).subscribe({
      next: (res: any) => {
        this.success = res.success;
        setTimeout(() => {
          this.success = '';
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/note'], { relativeTo: this.route });
        }, 2000);
      },
      error: (err) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }

  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    translate: 'yes',
    width: '100%',
    height: '40rem',
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
