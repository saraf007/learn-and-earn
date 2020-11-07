// Angular
import { Component, OnInit } from '@angular/core';

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
    selectedAnswer: string;
    correctAnswer = "Option 1";
    questions: Question[] = [];
    singleQuestion: Question;
    questionsSub: Subscription;
    loading = true;

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
          this.loading = false;
        });
    }

    /**Get first question and answer (document) of a collection */
    getFirstQuestionAnswer() {
      this.questionsService.getFirstQuestion().subscribe((singleQuestion: Question) => {
        console.log("Data from component: ", singleQuestion);
        this.singleQuestion =  singleQuestion;
        console.log("Template: " , this.singleQuestion);
        this.loading = false;
      });
    }

    onNext(questionId: string) {
        // this.questionsService.getQuestionsById(questionId);
    }

    onDelete(id: string) {
      this.questionsService.deleteQuestions(id);
    }

}
