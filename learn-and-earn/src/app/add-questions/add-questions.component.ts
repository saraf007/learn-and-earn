// Angular
import { Component, OnInit } from '@angular/core';

// Project
import { Question } from '../questions.model';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  newQuestion: string = '';
  answer: string = '';

  questions: Question[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddQuestion(question, option) {
   const questionandanswer = {
      question: question.value,
      answer: option.value
    };
    this.questions.push(questionandanswer);
    console.log(this.questions);
  }

}
