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
import { NotificationComponent } from './notification/notification.component';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { NavigationComponent } from './navigation/navigation.component';
import { AuthModule } from "./auth/auth.module";
import { QuestionComponent } from './view-questions/question.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogboxComponent,
    NotificationComponent,
    NavigationComponent,
    QuestionComponent,
    AddQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
