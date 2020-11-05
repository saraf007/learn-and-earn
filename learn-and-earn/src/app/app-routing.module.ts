// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Project
import { QuestionComponent } from './question/question.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
  { path: '', component: QuestionComponent},
  { path: 'add-question', component: AddQuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
