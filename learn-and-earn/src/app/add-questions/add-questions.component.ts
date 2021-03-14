// Angular
import { Component, OnInit } from '@angular/core';

// Project
import { Question } from '../questions.model';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  constructor(public questionsService: QuestionsService) { }

  ngOnInit(): void {
  }

  /**Add questions and answer */
  // onAddQuestion(questionNumber, question, answer) {
  //   console.log("The question number: " + questionNumber.value);
  //   console.log("The question entered: " + question.value);
  //   console.log("The answers entered: " + answer.value.split(","));
  //   this.questionsService.addQuestions(questionNumber.value, question.value, answer.value.split(","));
  // }

}
