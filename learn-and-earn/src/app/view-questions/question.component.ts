// Angular
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Project
import { Question } from '../questions.model';
import { QuestionsService } from '../add-questions/questions.service';
import { NotificationService } from "../notification/notification.service";

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
    isLoading = false;
    points: number = 0;
    dialogBox: any;
    isAnswered: boolean = false;
    disableCheckBtnOnCorrectAnswer: boolean = false;

    constructor(private questionsService: QuestionsService,
                private notificationService: NotificationService,
                private router: Router
                ) { }

    ngOnInit() {
       this.getFirstQuestionAnswer();
    }

    /**Get all questions and answers */
    getQuestionAnswer() {
      this.questionsService.getQuestions();
      this.questionsSub = this.questionsService.getQuestionUpdateListener()
        .subscribe((questions: Question[]) => {
          this.questions = questions;
          this.isLoading = false;
        });
    }

    /**Get first question and answer (document) of a collection */
    getFirstQuestionAnswer() {
      this.isLoading = true;
      this.questionsService.getFirstQuestion().subscribe((data : any) => {
        console.log(data);
        this.singleQuestion = data.questions;
        this.isLoading = false;
      });
      if(this.points !== 0) {
        this.points = parseInt(localStorage.getItem("points"));
      }
    }

    // get the next question
    onGetNextQuestion(questionNumber: string) {
      this.isLoading = true;
        this.questionsService.getNextQuestion(questionNumber).subscribe((data: any) => {
          this.singleQuestion = data.questions;
          this.isLoading = false;
        });
      this.isAnswered = false;
      this.disableCheckBtnOnCorrectAnswer = false;
    }

    onGetPreviousQuestion(questionNumber: string) {
      this.isLoading = true;
      this.questionsService.getPreviousQuestion(questionNumber).subscribe((data: any) => {
        console.log(data.questions);
        this.singleQuestion = data.questions;
        this.isLoading = false;
      })
    }

    onDelete(id: string) {
      this.questionsService.deleteQuestions(id);
    }

    // evaluate question
    evaluateQuestion(form: NgForm) {
      // check if answer is marked or not
      if(form.value.selectedAnswer === "") {
        this.notificationService.warn("Please choose one answer.", {autoClose: true});
      }
      // if answer is correct
     else if(form.value.selectedAnswer === this.singleQuestion.correctAnswer) {
        this.points = this.points + 1;
        localStorage.setItem('points', this.points.toString());
        this.isAnswered = true;
        this.disableCheckBtnOnCorrectAnswer = true;
        this.notificationService.success("Your answer is correct.", {autoClose: true});
      }
      // answer is wrong
      else{
        if(this.points !== 0) {
          this.points = this.points - 1;
        }
        this.isAnswered = true;
        this.disableCheckBtnOnCorrectAnswer = true;
        this.notificationService.error("Your answer is incorrect.", {autoClose: true});
      }
    }

    // finish quiz
    onFinishQuiz() {
      this.router.navigate(['/navigation']);
      localStorage.removeItem("points");
    }
}
