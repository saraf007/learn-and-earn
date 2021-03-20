// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Project
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuestionComponent } from './view-questions/question.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './account/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
