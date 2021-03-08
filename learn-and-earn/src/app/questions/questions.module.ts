// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Project
import { QuestionComponent } from './view-questions/question.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    QuestionComponent,
    AddQuestionsComponent
  ],
})
export class QuestionsModule { }
