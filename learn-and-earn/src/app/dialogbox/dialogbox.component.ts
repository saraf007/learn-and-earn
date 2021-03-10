// Angular
import { Component, Inject, OnInit } from '@angular/core';

// Project
import { Question } from '../questions.model';
import { QuestionsService } from '../add-questions/questions.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  isloading = false;
  singleQuestion: Question;

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
  }

  // get the next question
  onGetNextQuestion(questionNumber: any) {
    this.isloading = true;
      this.questionsService.getNextQuestion(questionNumber).subscribe((data: any) => {
        console.log(data);
        this.singleQuestion = data.questions;
        console.log(data.questions);
        this.isloading = false;
      });
  }

}
