// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Project
import { Question } from '../questions.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  private questions: Question[] = [];
  private questionsUpdated = new Subject<Question[]>();

  constructor(private http: HttpClient) {}

  /**GET: fetch questions */
  getQuestions() {
    this.http.get<{message: string, questions: any}>("http://localhost:3000/api/questions")
      .pipe(map((questionData) => {
        return questionData.questions.map(question => {
          return {
            question: question.question,
            answer: question.answer,
            id: question._id
          }
        });
      })).subscribe((transformedData) => {
        this.questions = transformedData;
        this.questionsUpdated.next([...this.questions]);
      });
  }

  getQuestionUpdateListener() {
    return this.questionsUpdated.asObservable();
}

  /**POST: add questions  */
  addQuestions(question: string, answer: string[]) {
    const questionPayLoad: Question = {
      id: null,
      question: question,
      answer: answer
    };
    this.http.post<Question[]>("http://localhost:3000/api/questions", questionPayLoad)
        .subscribe((data) => {
          console.log(data);
          this.questions.push(questionPayLoad);
        });
  }
}
