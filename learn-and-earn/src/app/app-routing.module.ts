// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Project
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './home/header/header.component';
import { QuestionComponent } from './questions/view-questions/question.component';
import { NavigationComponent } from './shared/navigation/navigation/navigation.component';

const routes: Routes = [
  // { path: '', component: HeaderComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
