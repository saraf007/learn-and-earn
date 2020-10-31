// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Project
import { Question } from '../questions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  private questions: Question[] = [];

  constructor(private http: HttpClient) {}

  /**GET: fetch questions */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>("http://localhost:3000/api/questions");
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
