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
    private questionsSub: Subscription;

    constructor(private questionsService: QuestionsService) { }

    ngOnInit() {
       this.getQuestionAnswer();
    }

    getQuestionAnswer() {
      this.questionsService.getQuestions();
      this.questionsSub = this.questionsService.getQuestionUpdateListener()
        .subscribe((questions: Question[]) => {
          this.questions = questions;
        });
    }

    onNext(answer: string) {
        if(answer == this.correctAnswer){
            alert("You are right " + answer);
        }
    }

    onDelete(id: string) {
      this.questionsService.deleteQuestions(id);
    }

}
