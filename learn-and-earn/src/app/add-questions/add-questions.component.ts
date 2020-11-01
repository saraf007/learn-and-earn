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

  onAddQuestion(question, answer) {
    console.log("The question entered: " + question.value);
    console.log("The answers entered: " + answer.value.split(","));
    this.questionsService.addQuestions(question.value, answer.value.split(","));
  }

}
