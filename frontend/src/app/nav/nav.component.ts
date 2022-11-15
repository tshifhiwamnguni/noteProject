import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from '../note-card/note-card.component';
import { ShareService } from '../services/share.service';
import { LogoutService } from '../services/logout.service';
import { GetIdService } from '../auth/get-id.service';
import { EditService } from '../services/edit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  show: boolean = false;
  userId: any;
  error: string = '';

  constructor(
    public share: ShareService,
    public logout: LogoutService,
    private getid: GetIdService,
    private edit: EditService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getid.getID().subscribe({
      next: (decoded: any) => {
        this.userId = decoded.decoded.id;
      },
      error: (error: any) => {
        this.error = error.error;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }
  cPassword: string = '';
  password: string = '';
  strong: string = '';
  showErr: boolean = false;

  change() {
    if (this.show === false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  changePassword() {
    this.showErr = true;
    this.strong = 'Password is Okay';
    setTimeout(() => {
      this.strong = '';
    }, 2000);
  }

  update() {
    if (this.password.length >= 6 && this.cPassword.length >= 6) {
      let passwords = {
        cPassword: this.cPassword,
        password: this.password,
      };

      this.edit.updatePassword(this.userId, passwords).subscribe({
        next: (res: any) => {
          this.strong = res.message;
          setTimeout(() => {
            this.strong = '';
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/note'], { relativeTo: this.route });
          }, 2000);
        },
        error: (err: any) => {
          this.error = err.error.error;
          setTimeout(() => {
            this.error = '';
          }, 2000);
        },
      });
    } else {
      this.error = 'Current password can not be less than 6';
      setTimeout(() => {
        this.error = '';
      }, 4000);
    }
  }
}
