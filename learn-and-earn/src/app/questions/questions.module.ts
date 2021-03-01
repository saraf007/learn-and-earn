// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Project
import { QuestionComponent } from './view-questions/question.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  imports: [
    FormsModule,
    AngularMaterialModule
  ],
  exports: [],
  declarations: [
    QuestionComponent,
    AddQuestionsComponent
  ],
  providers: [],
})
export class QuestionsModule { }
