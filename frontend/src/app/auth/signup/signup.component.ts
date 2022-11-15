import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../auth.service';
import { Spinkit } from 'ng-http-loader';
import { GetIdService } from '../get-id.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public spinkit = Spinkit.skCubeGrid;
  userId: any;
  error: any;

  constructor(
    private auth: AuthService,
    private formbuilder: FormBuilder,
    private route: Router,
    public share: ShareService,
  ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.email, Validators.minLength(10), Validators.required],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    localStorage.clear();
  }
  get f() {
    return this.form.controls;
  }

  exist: string = '';
  successfull: string = '';

  register() {
    let user = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };


    if (this.form.invalid) {
      return;
    } else {
      this.auth.register(user).subscribe({
        next: (res: any) => {
          this.auth.isLoggIn = true;
          localStorage.setItem('token', res.token);

          this.successfull = res.message;

          setTimeout(() => {
            this.route.navigate(['/note']);
          }, 800);
        },
        error: (err: any) => {
          this.exist = err.error.exist;
          setTimeout(() => {
            this.exist = '';
          }, 2000);
        },
      });
    }
  }
}
