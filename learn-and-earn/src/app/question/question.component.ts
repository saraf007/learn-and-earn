// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// RXJS
import { Subscription } from 'rxjs';

// Project
import { Question } from '../questions.model';
import { QuestionsService } from '../add-questions/questions.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    selectedAnswer: any;
    questions: Question[] = [];
    singleQuestion: Question;
    questionsSub: Subscription;
    isloading = false;
    points: number = 0;
    dialogBox: any;

    constructor(private questionsService: QuestionsService, private dialog: MatDialog) { }

    ngOnInit() {
       //this.getQuestionAnswer();
       this.getFirstQuestionAnswer();
    }

    /**Get all questions and answers */
    getQuestionAnswer() {
      this.questionsService.getQuestions();
      this.questionsSub = this.questionsService.getQuestionUpdateListener()
        .subscribe((questions: Question[]) => {
          this.questions = questions;
          this.isloading = false;
        });
    }

    /**Get first question and answer (document) of a collection */
    getFirstQuestionAnswer() {
      this.isloading = true;
      this.questionsService.getFirstQuestion().subscribe((data : any) => {
        console.log(data.questions);
        this.singleQuestion = data.questions;
        this.isloading = false;
      });
    }

    // get the next question
    onGetNextQuestion(questionNumber: string) {
      this.isloading = true;
        this.questionsService.getNextQuestion(questionNumber).subscribe((data: any) => {
          console.log(data.questions);
          this.singleQuestion = data.questions;
          this.isloading = false;
        });
    }

    onGetPreviousQuestion(questionNumber: string) {
      this.isloading = true;
      this.questionsService.getPreviousQuestion(questionNumber).subscribe((data: any) => {
        console.log(data.questions);
        this.singleQuestion = data.questions;
        this.isloading = false;
      })
    }

    onDelete(id: string) {
      this.questionsService.deleteQuestions(id);
    }

    // evaluate question
    evaluateQuestion(selectedAnswer: string, questionNumber: string) {
      console.log(selectedAnswer);
      console.log(this.singleQuestion.correctAnswer);
      if(selectedAnswer === this.singleQuestion.correctAnswer) {
        console.log("your answer: " + selectedAnswer + " is correct.");
        this.dialog.open(DialogBoxComponent, {
          data: {

          }
        });
        this.points = this.points + 1;
        this.onGetNextQuestion(questionNumber);
      }
      else{
        console.log("your answer: " + selectedAnswer + " is wrong.");
      }
    }

}

@Component({
  selector: 'app-dialogBox',
  templateUrl: './dialogBox.component.html'
})
export class DialogBoxComponent {
}
