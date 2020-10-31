// Angular
import { Component, OnInit } from '@angular/core';

// Project
import { Question } from '../questions.model';
import { QuestionsService } from '../add-questions/questions.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    // answers: string[] = ["Option 1","Option 2","Option 3","Option 4"];
    selectedAnswer: string;
    // question:string = "What is called the Power House of the Cell?";
    correctAnswer = "Option 1";
    // dummyQuestions: any = [];
    questions: Question[] = [];
    private questionsSub: Subscription;

    constructor(private questionsService: QuestionsService) {
      // this.dummyQuestions = [
      //   {
      //     id: "1",
      //     question: "question1",
      //     answer: ["answer1", "answer2"]
      //   },
      //   {
      //     id: "2",
      //     question: "question2",
      //     answer: ["answer1", "answer2"]
      //   }
      // ];
    }

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

}
