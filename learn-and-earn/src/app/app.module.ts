// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Project
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { NavigationComponent } from './navigation/navigation.component';
import { AuthModule } from "./auth/auth.module";
import { QuestionComponent } from './view-questions/question.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [
    AppComponent,
    DialogboxComponent,
    NavigationComponent,
    QuestionComponent,
    AddQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    CommonModule,
    FormsModule,
    NotificationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
