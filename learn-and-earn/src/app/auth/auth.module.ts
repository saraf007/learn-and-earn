// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Project
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  imports: [
    FormsModule,
    AngularMaterialModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [],
})
export class AuthModule { }
