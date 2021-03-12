// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Project
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationModule } from "../notification/notification.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotificationModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  providers: [],
})
export class AuthModule { }
