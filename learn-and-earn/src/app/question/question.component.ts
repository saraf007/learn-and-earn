// Angular
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Project
import { Question } from '../questions.model';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    answers: string[] = ["Option 1","Option 2","Option 3","Option 4"];
    selectedAnswer: string;
    question = "What is called the Power House of the Cell?";
    correctAnswer = "Option 1";

    constructor() {}

    ngOnInit() {
    }

    onNext(answer: string) {
        if(answer == this.correctAnswer){
            alert("You are right " + answer);
        }
    }

}
