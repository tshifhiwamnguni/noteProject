import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateComponent } from './create/create.component';
import { SecurityGuard } from './guard/security.guard';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  {path: '', component: HomeComponent},{
    path: 'signup', component: SignupComponent
  },{path: 'signin', component: SigninComponent},
  {path: 'note', component: NoteComponent},
  {path: 'create', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
