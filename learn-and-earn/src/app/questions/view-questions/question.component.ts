// Angular
import { Component, OnInit } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Project
import { Question } from '../questions.model';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
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
    isAnswerCorrect: boolean = false;

    constructor(private questionsService: QuestionsService) { }

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
    evaluateQuestion(selectedAnswer: string) {
      // check if answer is marked or not
      if(selectedAnswer === undefined || selectedAnswer === null) {
        this.isAnswerCorrect = false;
        // this.dialogConfig(this.isAnswerCorrect, selectedAnswer);
      }
      // check if answer is correct or not
     else if(selectedAnswer === this.singleQuestion.correctAnswer) {
        this.points = this.points + 1;
        this.isAnswerCorrect = true;
        // this.dialogConfig(this.isAnswerCorrect, selectedAnswer);
      }
      // answer is wrong
      else{
        this.points = this.points - 1;
        this.isAnswerCorrect = false;
        // this.dialogConfig(this.isAnswerCorrect, selectedAnswer);
      }
    }

    // dialog configuration
    // private dialogConfig(isAnswerCorrect: boolean, selectedAnswer: string) {
    //   const config = new MatDialogConfig();
    //   config.disableClose = true;

    //   if (!isAnswerCorrect) {
    //     if(selectedAnswer === undefined) {
    //       config.panelClass = "warning";
    //       config.data = {
    //         dialogDescription : `Please select an answer!`
    //       };
    //       this.dialog.open(DialogboxComponent, config);
    //       return;
    //     }
    //     config.panelClass = "danger";
    //     config.data = {
    //       dialogDescription : `Your answer : ${selectedAnswer} is wrong.`,
    //       dialogContent: `You have lost 1 Point.
    //       Your Total Points are ${this.points}.`
    //     };
    //     this.dialog.open(DialogboxComponent, config);
    //   }
    //   if(isAnswerCorrect) {
    //     config.panelClass = "success";
    //     config.data = {
    //       dialogDescription : `Your answer : ${selectedAnswer} is correct.`,
    //       dialogContent: `You have earned 1 Point.
    //       Your Total Points are ${this.points}.`,
    //     };
    //     this.dialog.open(DialogboxComponent, config);
    //   }
    // }

}
